import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Response} from "../model/Response";
import {Role} from "../model/Role";
import {Project} from "../model/project_dto";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  baseUrl = environment.baseUrl
  constructor(private http: HttpClient) { }

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseUrl}`+'/Projects');
  }

  addProject(projectData: any) {
    return this.http.post(this.baseUrl+'/Projects', projectData);
  }

  updateProject(id:any,projectData: any) {
    return this.http.put(this.baseUrl+'/Projects/'+id, projectData);
  }

  deleteProject(id:any) {
    return this.http.delete(this.baseUrl+'/Projects/'+id);
  }
}
