import { Injectable } from '@angular/core';
import { EHttpResponseCode } from '@core/enums';
import { ILoginCredentials, IRegisterCredentials, IApiResponse, IUserDetails } from '@core/models';
import { ApiService } from '@core/services';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userDetails: IUserDetails | null = null;

  constructor(
    private _apiService: ApiService,
  ) { }

  login(credentials: ILoginCredentials) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const res: IApiResponse = await this._apiService.login(credentials);
        if (res.status === EHttpResponseCode.POST_SUCCESS) {
          return resolve(res?.body);
        } else {
          throw new Error();
        }
      } catch (err) {
        return reject(false);
      }
    });
  }

  register(credentials: IRegisterCredentials) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const res: IApiResponse = await this._apiService.register(credentials);
        if (res.status === EHttpResponseCode.POST_SUCCESS) {
          return resolve(res?.body);
        } else {
          throw new Error();
        }
      } catch (err) {
        return reject(false);
      }
    });
  }

  isAuthenticated() {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const res: IApiResponse = await this._apiService.getUser();
        if (res.status === EHttpResponseCode.GET_SUCCESS) {
          this.userDetails = res?.body;
          resolve(true);
        } else {
          resolve(false)
        }
      } catch (err) {
        resolve(false)
      }
    });
  }

  getUser() {
    return new Promise<IUserDetails>(async (resolve, reject) => {
      try {
        const res: IApiResponse = await this._apiService.getUser();
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


}
