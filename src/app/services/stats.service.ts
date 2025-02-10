import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Response} from "../model/Response";
import {Role} from "../model/Role";

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  baseUrl = environment.baseUrl
  constructor(private http: HttpClient) { }

  getUserStats(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`+'/Statistics/user-stats');
  }

  getTasksStats(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`+'/Statistics/tasks/status-count');
  }

  getTasksStatsByUser(userId:any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`+'/Statistics/users/'+userId+'/task-statistics');
  }

  getProjectStats(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`+'/Statistics/projects-stats');
  }
}
