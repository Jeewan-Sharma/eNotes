import { Injectable } from '@angular/core';
import { INote, IApiResponse, IUserDetails } from '@core/models';
import { EHttpResponseCode } from '@core/enums';
import { ApiService, AuthService } from '@core/services';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  userDetails: IUserDetails | null = this._authService.userDetails;

  constructor(
    private _apiService: ApiService,
    private _authService: AuthService
  ) { }

  getNotes() {
    return new Promise<INote[]>(async (resolve, reject) => {
      try {
        const res: IApiResponse = await this._apiService.getNotes(this.userDetails!._id);
        if (res.status === EHttpResponseCode.GET_SUCCESS) {
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

}
