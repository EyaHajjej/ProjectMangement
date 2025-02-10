import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Role} from "../model/Role";
import {Response} from "../model/Response";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  baseUrl = environment.baseUrl
  constructor(private http: HttpClient) { }

  getAllRoles(): Observable<Response<Role[]>> {
    return this.http.get<Response<Role[]>>(`${this.baseUrl}`+'/Role');
  }
}
