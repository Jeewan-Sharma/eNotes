import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { INote } from '@core/models';
import { DeviceWidthService } from '@core/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  text = '<p>jgfdjhgfkhg</p>'

  notes!: INote[];
  detailsDialogVisibility: boolean = false;
  addDialogVisibility: boolean = false;
  form!: FormGroup;
  selectedNote!: INote;

  constructor(protected _deviceWidthService: DeviceWidthService) { }

  ngOnInit(): void {
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

  getNotes() {
    this.notes = [
      {
        noteId: 1,
        title: 'Title 1 is the best title among these all the title. So, It is called as a king of the titles.',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        tags: ['tag1', 'tag2', 'tag3'],
        isImportant: false,
        modifiedDate: '07/05/2024',
      },
      {
        noteId: 2,
        title: 'Title 2',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        tags: ['tag1', 'tag2'],
        isImportant: false,
        modifiedDate: '07/05/2024',
      },
      {
        noteId: 3,
        title: 'Title 3',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        tags: ['tag1'],
        isImportant: false,
        modifiedDate: '07/05/2024',
      },
      {
        noteId: 4,
        title: 'Title 4',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        tags: ['tag1', 'tag2', 'tag3', 'tag4'],
        isImportant: false,
        modifiedDate: '07/05/2024',
      },
      {
        noteId: 5,
        title: 'Title 5',
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        tags: ['tag1', 'tag2', 'tag3'],
        isImportant: false,
        modifiedDate: '07/05/2024',
      }
    ]
  }

  saveDetailsNote() {
    console.log(this.form.value)
    console.log(this.text)
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
