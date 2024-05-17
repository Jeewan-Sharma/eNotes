import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@core/services';
import { API_URL } from '@core/consts';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpService) { }

  login(credentials: any): Promise<any> {
    return firstValueFrom(
      this.http.post(API_URL.ENOTES.LOGIN(), credentials))
  }
}
