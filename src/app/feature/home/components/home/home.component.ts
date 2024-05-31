import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { INote } from '@core/models';
import { AuthService, DeviceWidthService, LoaderService, NotesService, ToastService } from '@core/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  notes!: INote[];
  detailsDialogVisibility: boolean = false;
  addDialogVisibility: boolean = false;
  deleteDialogVisibility: boolean = false;
  form!: FormGroup;
  selectedNote!: INote;

  constructor(
    protected _deviceWidthService: DeviceWidthService,
    private _noteService: NotesService,
    private _loaderService: LoaderService,
    private _toastService: ToastService,
  ) { }

  async ngOnInit() {
    this.getNotes();
    this.initForm();
  }

  get screenSize$() {
    return this._deviceWidthService.screenSize$;
  }

  initForm() {
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
    this.notes = await this._noteService.getNotes();
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
      this.getNotes();
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
      this.getNotes();
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
      this.getNotes();
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
        message: `${res.title} Added Successfully`,
      });
      this.closeDeleteDialog()
    } catch (e) {
      this._toastService.showSuccess({
        message: `Oops! Something went wrong try again`,
      });
      throw e;
    }
  }
}
