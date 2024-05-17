import { Injectable } from '@angular/core';
import { EHttpResponseCode } from '@core/enums';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _apiService: ApiService,
  ) { }

  login(credentials: any) {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const res = await this._apiService.login(credentials);
        if (res.statuscode === EHttpResponseCode.GET_SUCCESS) {
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
