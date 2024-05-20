import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@core/services';
import { API_URL } from '@core/consts';
import { ILoginCredentials, IRegisterCredentials } from '@core/models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpService) { }

  login(credentials: ILoginCredentials): Promise<any> {
    return firstValueFrom(
      this.http.post(API_URL.ENOTES.LOGIN(), credentials)
    );
  }

  register(credentials: IRegisterCredentials): Promise<any> {
    return firstValueFrom(
      this.http.post(API_URL.ENOTES.REGISTER(), credentials)
    );
  }
}
