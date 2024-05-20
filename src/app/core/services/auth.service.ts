import { Injectable } from '@angular/core';
import { EHttpResponseCode } from '@core/enums';
import { ILoginCredentials, IRegisterCredentials } from '@core/models';
import { ApiService } from '@core/services';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _apiService: ApiService,
  ) { }

  login(credentials: ILoginCredentials) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const res = await this._apiService.login(credentials);
        if (res.status === EHttpResponseCode.GET_SUCCESS) {
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
        const res = await this._apiService.register(credentials);
        if (res.status === EHttpResponseCode.GET_SUCCESS) {
          return resolve(res?.body);
        } else {
          throw new Error();
        }
      } catch (err) {
        return reject(false);
      }
    });
  }

}
