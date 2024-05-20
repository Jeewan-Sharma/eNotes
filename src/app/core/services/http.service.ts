import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, finalize, throwError } from 'rxjs';
import { IRequestModel } from '../models/request.models';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) { }

  /**
   * @param  {string} method
   * @param  {string} url
   * @param  {any} body?
   * @param  {HttpParams|{[param:string]:string|string[]}} params?
   * @param  {HttpHeaders} header?
   * @returns Observable
   */
  request(
    method: string,
    url: string,
    body?: any,
    params?: HttpParams | { [param: string]: string | string[] },
    header?: HttpHeaders
  ): Observable<any> {
    const headers = header
      ? header
      : new HttpHeaders({
        'content-type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      });
    const options: IRequestModel = {
      body: body,
      headers: headers,
      observe: 'response',
      params: params,
    };
    return this.http.request(method, url, options).pipe(
      catchError(this.handleError),
      finalize(() => { })
    );
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage;
    if (error.status == 404) {
      errorMessage = `Resource Not Found`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // TODO: Log the error to server
    return throwError(error);
  }

  /**
   * @param  {string} url
   * @param  {HttpHeaders} header?
   * @param  {HttpParams|{[param:string]:string|string[]}} params?
   * @returns Observable
   */
  get(
    url: string,
    header?: HttpHeaders,
    params?: HttpParams | { [param: string]: string | string[] }
  ): Observable<any> {
    return this.request('GET', url, null, params, header);
  }

  /**
   * @param  {string} url
   * @param  {any|null} body
   * @param  {HttpHeaders} header?
   * @param  {HttpParams|{[param:string]:string|string[]}} params?
   * @returns Observable
   */
  post(
    url: string,
    body: any | null,
    header?: HttpHeaders,
    params?: HttpParams | { [param: string]: string | string[] }
  ): Observable<any> {
    return this.request('POST', url, body, params, header);
  }

  /**
   * @param  {string} url
   * @param  {any|null} body
   * @param  {HttpHeaders} header?
   * @param  {HttpParams|{[param:string]:string|string[]}} params?
   * @returns Observable
   */
  put(
    url: string,
    body: any | null,
    header?: HttpHeaders,
    params?: HttpParams | { [param: string]: string | string[] }
  ): Observable<any> {
    return this.request('PUT', url, body, params, header);
  }

  /**
   * @param  {string} url
   * @param  {any|null} body
   * @param  {HttpHeaders} header?
   * @param  {HttpParams|{[param:string]:string|string[]}} params?
   * @returns Observable
   */
  delete(
    url: string,
    body: any | null,
    header?: HttpHeaders,
    params?: HttpParams | { [param: string]: string | string[] }
  ): Observable<any> {
    return this.request('DELETE', url, body, params, header);
  }

  postFormData(
    url: string,
    body: any | null,
    header?: HttpHeaders,
    params?: HttpParams | { [param: string]: string | string[] }
  ): Observable<any> {
    return this.http.post(url, body);
  }
}
