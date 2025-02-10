import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProjectTaskService {


  baseUrl = environment.baseUrl
  constructor(private http: HttpClient) { }
  AddTask(projecttask: any) {
    return this.http.post(this.baseUrl+'/Tasks', projecttask);
  }
  UpdateStatusTask(projecttask: any) {
    return this.http.put(this.baseUrl+'/Tasks/update-status', projecttask);
  }

  UpdateTask(project_task: any,id_task:any) {
    return this.http.put(this.baseUrl+'/Tasks/'+id_task, project_task);
  }

  DeleteTask(idTask: any) {
    return this.http.delete(this.baseUrl+'/Tasks/'+idTask);
  }
}
