import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ASSETS } from '@core/consts';
import { EPageState } from '@core/enums';
import { INote } from '@core/models';
import { DeviceWidthService, LoaderService, NotesService, ToastService } from '@core/services';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  readonly ASSETS = ASSETS;
  readonly ePageState = EPageState;
  protected pageState$ = new BehaviorSubject<EPageState>(
    this.ePageState.DEFAULT
  );

  notes!: INote[];
  private notesSubscription!: Subscription;
  detailsDialogVisibility: boolean = false;
  addDialogVisibility: boolean = false;
  deleteDialogVisibility: boolean = false;
  form!: FormGroup;
  searchForm!: FormGroup;
  selectedNote!: INote;

  constructor(
    protected _deviceWidthService: DeviceWidthService,
    private _noteService: NotesService,
    private _loaderService: LoaderService,
    private _toastService: ToastService,
  ) { }

  async ngOnInit() {
    this.notesSubscription = this._noteService.onDisplayNotesSubject$.subscribe(
      notes => this.notes = notes
    );
    this.getNotes();
    this.initForm();
  }

  get screenSize$() {
    return this._deviceWidthService.screenSize$;
  }

  get searchKey$() {
    return this._noteService.searchKey$;
  }

  initForm() {
    this.searchForm = new FormGroup({
      searchControl: new FormControl<string | null>(null, [Validators.required])
    })
    this.form = new FormGroup({
      title: new FormControl<string | null>(null, [Validators.required]),
      description: new FormControl<string | null>(null, [Validators.required]),
      tagsForm: new FormArray([]),
      modifiedDate: new FormControl<string | null>(new Date().toString().substring(0, 10)),
    });
  }

  get tagsForm() {
    return this.form.get('tagsForm') as FormArray;
  }

  addTag() {
    this.tagsForm.push(new FormControl<string | null>(null, [Validators.required]));
  }

  removeTag(index: number) {
    this.tagsForm.removeAt(index);
  }

  async getNotes() {
    try {
      this.pageState$.next(this.ePageState.LOADING);
      await this._noteService.getNotes();
      this.pageState$.next(this.ePageState.SUCCESS);
      if (this.notes.length === 0) {
        this.pageState$.next(this.ePageState.EMPTY);
      }
    } catch (e) {
      this.pageState$.next(this.ePageState.ERROR);
      this._toastService.showSuccess({
        message: `Oops! Something went wrong try again`,
      });
      throw e
    }
  }

  async updateNote() {
    try {
      this._loaderService.showLoader();
      if (this.form.invalid) {
        this.form.markAllAsTouched()
        console.log('invalid Form')
        return
      }
      const newNoteState = {
        title: this.form.controls['title'].value,
        description: this.form.controls['description'].value,
        tags: this.tagsForm.value
      };
      const res = await this._noteService.updateNote(this.selectedNote._id, newNoteState);
      this._toastService.showSuccess({
        message: `${res.title} updated Successfully`,
      });
      this._noteService.refreshNotesByRecentAction();
      this.detailsDialogVisibility = false;
    } catch (e) {
      this._toastService.showSuccess({
        message: `Oops! Something went wrong try again`,
      });
      throw e;
    } finally {
      this._loaderService.hideLoader();
    }
  }

  async setImportance(isImportant: boolean) {
    try {
      this._loaderService.showLoader();
      const res = await this._noteService.setImportance(this.selectedNote._id, isImportant);
      this._toastService.showSuccess({
        message: `Importance set successfully`,
      });
      this._noteService.refreshNotesByRecentAction();
      this.selectedNote = res;
    } catch (e) {
      this._toastService.showSuccess({
        message: `Oops! Something went wrong try again`,
      });
      throw e;
    } finally {
      this._loaderService.hideLoader();
    }
  }

  openDetails(selectedNote: INote) {
    this.selectedNote = selectedNote;
    this.tagsForm.clear();
    selectedNote.tags.forEach(tag => {
      this.tagsForm.push(new FormControl<string>(tag));
    });
    this.form.patchValue(selectedNote)
    this.detailsDialogVisibility = true;
  }

  closeDetailsDialog() {
    this.detailsDialogVisibility = false;
  }

  openAddDialog() {
    this.form.reset();
    this.tagsForm.clear();
    this.addDialogVisibility = true;
  }

  closeAddDialog() {
    this.addDialogVisibility = false;
  }

  async addNewNote() {
    try {
      this._loaderService.showLoader();
      if (this.form.invalid) {
        this.form.markAllAsTouched()
        console.log('invalid Form')
        return
      }
      const newNoteState = {
        title: this.form.controls['title'].value,
        description: this.form.controls['description'].value,
        tags: this.tagsForm.value
      };
      const res = await this._noteService.createNotes(newNoteState);
      this._toastService.showSuccess({
        message: `${res.title} Added Successfully`,
      });
      this._noteService.refreshNotesByRecentAction();
      this.addDialogVisibility = false;
    } catch (e) {
      this._toastService.showSuccess({
        message: `Oops! Something went wrong try again`,
      });
      throw e;
    } finally {
      this._loaderService.hideLoader();
    }
  }

  openDeleteDialog(selectedNote: INote) {
    this.selectedNote = selectedNote;
    this.deleteDialogVisibility = true;
  }

  closeDeleteDialog() {
    this.deleteDialogVisibility = false;
  }

  async confirmDelete(noteId: string) {
    try {
      const res = await this._noteService.deleteNote(noteId);
      this._toastService.showSuccess({
        message: `${res.title} Deleted Successfully`,
      });
      this.closeDeleteDialog();
      this._noteService.refreshNotesByRecentAction();
    } catch (e) {
      this._toastService.showSuccess({
        message: `Oops! Something went wrong try again`,
      });
      throw e;
    }
  }

  async onSearch() {
    try {
      if (this.searchForm.invalid) {
        this.searchForm.markAllAsTouched();
        return
      }
      this._noteService.setSearchKey(this.searchForm.controls['searchControl'].value)
      this._loaderService.showLoader();
      await this._noteService.searchNotes(this.searchForm.controls['searchControl'].value);
    } catch (e) {
      throw e
    } finally {
      this._loaderService.hideLoader();
    }
  }

  cancelSearch() {
    this._noteService.setSearchKey(null)
    this.searchForm.reset();
    this._noteService.refreshNotesByRecentAction();
  }

  ngOnDestroy(): void {
    this.notesSubscription.unsubscribe();
  }
}
