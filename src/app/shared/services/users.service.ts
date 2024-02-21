import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { User, UserListRequest } from '../types/users';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url = environment.apiUrl + '/users';

  constructor(
    private http: HttpClient
  ) { }

  getList(params: UserListRequest): Observable<User[]> {

    let queryParams: HttpParams = new HttpParams();
    let key: keyof typeof params;

    for(key in params) {
      queryParams = queryParams.append(key, params[key]);
    }

    return this.http.get<User[]>(this.url, { params: queryParams });
  }
}
