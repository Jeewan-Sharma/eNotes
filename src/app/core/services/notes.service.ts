import { Injectable } from '@angular/core';
import { INote, IApiResponse, IUserDetails } from '@core/models';
import { EHttpResponseCode } from '@core/enums';
import { ApiService, AuthService } from '@core/services';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  userDetails: IUserDetails | null = this._authService.userDetails;

  private noteSubject: BehaviorSubject<INote[]> = new BehaviorSubject<INote[]>([]);
  noteSubject$: Observable<INote[]> = this.noteSubject.asObservable();

  private onDisplayNotesSubject: BehaviorSubject<INote[]> = new BehaviorSubject<INote[]>([]);
  onDisplayNotesSubject$: Observable<INote[]> = this.onDisplayNotesSubject.asObservable();

  private selectedTab: BehaviorSubject<string> = new BehaviorSubject<string>('All Notes');
  selectedTab$: Observable<string> = this.selectedTab.asObservable();

  private tags: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  tags$: Observable<string[]> = this.tags.asObservable();

  private searchKey: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  searchKey$: Observable<string | null> = this.searchKey.asObservable();

  constructor(
    private _apiService: ApiService,
    private _authService: AuthService
  ) { }

  getNotes() {
    return new Promise<INote[]>(async (resolve, reject) => {
      try {
        const res: IApiResponse = await this._apiService.getNotes(this.userDetails!._id);
        if (res.status === EHttpResponseCode.GET_SUCCESS) {
          this.noteSubject.next(res?.body);
          this.onDisplayNotesSubject.next(res?.body);
          return resolve(res?.body);
        } else {
          throw new Error();
        }
      } catch (err) {
        throw new Error();
      }
    });
  }

  getImportantNotes() {
    return new Promise<INote[]>(async (resolve, reject) => {
      try {
        const res: IApiResponse = await this._apiService.getImportantNotes(this.userDetails!._id);
        if (res.status === EHttpResponseCode.GET_SUCCESS) {
          this.onDisplayNotesSubject.next(res?.body);
          return resolve(res?.body);
        } else {
          throw new Error();
        }
      } catch (err) {
        throw new Error();
      }
    });
  }

  getNotesTag() {
    return new Promise<string[]>(async (resolve, reject) => {
      try {
        const res: IApiResponse = await this._apiService.getNotesTags(this.userDetails!._id);
        if (res.status === EHttpResponseCode.GET_SUCCESS) {
          this.tags.next(res?.body);
          return resolve(res?.body);
        } else {
          throw new Error();
        }
      } catch (err) {
        throw new Error();
      }
    });
  }

  getNotesByTag(tag: string) {
    return new Promise<INote[]>(async (resolve, reject) => {
      try {
        const res: IApiResponse = await this._apiService.getNotesByTag(this.userDetails!._id, tag);
        if (res.status === EHttpResponseCode.GET_SUCCESS) {
          this.onDisplayNotesSubject.next(res?.body);
          return resolve(res?.body);
        } else {
          throw new Error();
        }
      } catch (err) {
        throw new Error();
      }
    });
  }

  searchNotes(searchTerm: string) {
    return new Promise<INote[]>(async (resolve, reject) => {
      try {
        const res: IApiResponse = await this._apiService.searchNotes(this.userDetails!._id, searchTerm);
        if (res.status === EHttpResponseCode.GET_SUCCESS) {
          this.onDisplayNotesSubject.next(res?.body);
          return resolve(res?.body);
        } else {
          throw new Error();
        }
      } catch (err) {
        throw new Error();
      }
    });
  }

  createNotes(newNote: any) {
    return new Promise<INote>(async (resolve, reject) => {
      try {
        const res: IApiResponse = await this._apiService.createNotes(newNote);
        if (res.status === EHttpResponseCode.GET_SUCCESS) {
          return resolve(res?.body);
        } else {
          throw new Error();
        }
      } catch (err) {
        throw new Error();
      }
    })
  }

  deleteNote(noteId: string) {
    return new Promise<INote>(async (resolve, reject) => {
      try {
        const res: IApiResponse = await this._apiService.deleteNote(noteId);
        if (res.status === EHttpResponseCode.GET_SUCCESS) {
          return resolve(res?.body);
        } else {
          throw new Error();
        }
      } catch (err) {
        throw new Error();
      }
    })
  }

  updateNote(noteId: string, updatedNote: any) {
    return new Promise<INote>(async (resolve, reject) => {
      try {
        const res: IApiResponse = await this._apiService.updateNote(noteId, updatedNote);
        if (res.status === EHttpResponseCode.GET_SUCCESS) {
          return resolve(res?.body);
        } else {
          throw new Error();
        }
      } catch (err) {
        throw new Error();
      }
    })
  }

  setImportance(noteId: string, isImportant: boolean) {
    return new Promise<INote>(async (resolve, reject) => {
      try {
        const res: IApiResponse = await this._apiService.setImportance(noteId, isImportant);
        if (res.status === EHttpResponseCode.GET_SUCCESS) {
          return resolve(res?.body);
        } else {
          throw new Error();
        }
      } catch (err) {
        throw new Error();
      }
    })
  }

  selectTab(tab: string) {
    this.selectedTab.next(tab);
  }

  setSearchKey(tab: string | null) {
    this.searchKey.next(tab);
  }

  // refresh by checking recent search or tabs selected on updates
  refreshNotesByRecentAction() {
    this.getNotesTag();
    if (this.searchKey.value != null) {
      this.searchNotes(this.searchKey.value)
    } else if (this.selectedTab.value == 'All Notes') {
      this.getNotes();
    } else if (this.selectedTab.value == 'Important notes') {
      this.getImportantNotes();
    } else {
      this.getNotesByTag(this.selectedTab.value);
    }
  }
}
