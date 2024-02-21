import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CreateTask, Task, TaskListRequest } from '../types/tasks';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private url: string = environment.apiUrl + '/tasks';

  constructor(
    private http: HttpClient
  ) { }

  getList(params: TaskListRequest): Observable<HttpResponse<Task[]>> {

    let queryParams: HttpParams = new HttpParams();

    if(params){
      if(params.hasOwnProperty('sort') && params.hasOwnProperty('order') && params.sort && params.order){
        queryParams = queryParams.append('_sort', params.sort);
        queryParams = queryParams.append('_order', params.order);
      }
      if(params.hasOwnProperty('page') && params.hasOwnProperty('limit') && params.page && params.limit){
        queryParams = queryParams.append('_page', params.page);
        queryParams = queryParams.append('_limit', params.limit);
      }
    }

    queryParams = queryParams.append('_expand', 'user');

    return this.http.get<Task[]>(this.url, { params: queryParams, observe: 'response' });
  }

  remove(id: number): Observable<any> {

    return this.http.delete<any>(this.url + '/' + id);
  }

  create(data: CreateTask): Observable<CreateTask> {

    return this.http.post<Task>(this.url, data);
  }
}
