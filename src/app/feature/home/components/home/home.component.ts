import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { INote } from '@core/models';
import { AuthService, DeviceWidthService, NotesService } from '@core/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  notes!: INote[];
  detailsDialogVisibility: boolean = false;
  addDialogVisibility: boolean = false;
  form!: FormGroup;
  selectedNote!: INote;

  constructor(
    protected _deviceWidthService: DeviceWidthService,
    private _noteService: NotesService,
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

  saveDetailsNote() {
    console.log(this.form.value)
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

  addNewNote() {
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      console.log('invalid Form')
      return
    }
    console.log(this.form.value)
  }


}
