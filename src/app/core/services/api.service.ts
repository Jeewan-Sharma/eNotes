import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@core/services';
import { API_URL } from '@core/consts';
import { ILoginCredentials, INote, IRegisterCredentials } from '@core/models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpService) { }

  login(credentials: ILoginCredentials): Promise<any> {
    return firstValueFrom(
      this.http.post(API_URL.ENOTES.LOGIN, credentials)
    );
  }

  logout(): Promise<any> {
    return firstValueFrom(
      this.http.post(API_URL.ENOTES.LOGOUT, '')
    );
  }

  register(credentials: IRegisterCredentials): Promise<any> {
    return firstValueFrom(
      this.http.post(API_URL.ENOTES.REGISTER, credentials)
    );
  }

  getUser(): Promise<any> {
    return firstValueFrom(
      this.http.get(API_URL.ENOTES.GET_USER)
    )
  }

  getNotes(userID: string | null): Promise<any> {
    return firstValueFrom(
      this.http.get(API_URL.ENOTES.GET_NOTES + `/${userID}`)
    )
  }

  createNotes(newNote: INote) {
    return firstValueFrom(
      this.http.post(API_URL.ENOTES.CREATE_NOTES, newNote)
    );
  }

  deleteNote(noteId: string) {
    return firstValueFrom(
      this.http.delete(API_URL.ENOTES.DELETE_NOTES + `/${noteId}`)
    );
  }

  updateNote(noteId: string, updatedNote: INote) {
    return firstValueFrom(
      this.http.put(API_URL.ENOTES.UPDATE_NOTES + `/${noteId}`, updatedNote)
    );
  }

  setImportance(noteId: string, isImportance: boolean) {
    return firstValueFrom(
      this.http.put(API_URL.ENOTES.SET_NOTES_IMPORTANCE + `/${noteId}`, { isImportant: isImportance })
    );
  }

  getImportantNotes(userId: string) {
    return firstValueFrom(
      this.http.get(API_URL.ENOTES.GET_IMPORTANT_NOTES + `/${userId}`)
    );
  }

  getNotesByTag(userId: string, tag: string) {
    return firstValueFrom(
      this.http.post(API_URL.ENOTES.GET_NOTES_BY_TAGS + `/${userId}`, { tag: tag })
    );
  }

  searchNotes(userId: string, searchTerm: string) {
    return firstValueFrom(
      this.http.post(API_URL.ENOTES.SEARCH + `/${userId}`, { keyword: searchTerm })
    );
  }

  getNotesTags(userId: string) {
    return firstValueFrom(
      this.http.get(API_URL.ENOTES.GET_NOTES_TAGS + `/${userId}`)
    );
  }
}
