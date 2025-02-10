import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Project} from "../model/project_dto";

@Injectable({
  providedIn: 'root'
})
export class AssigningService {

  baseUrl = environment.baseUrl
  constructor(private http: HttpClient) { }

  getProjectAssignments(projectId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Assignments/project/${projectId}`);
  }

  assignUserToProject(assignData: { userId: string, projectId: number }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Assignments/assign`, assignData);
  }

  unassignUserFromProject(unassignData: { userId: string, projectId: number }): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/Assignments/unassign`, { body: unassignData });
  }
}
