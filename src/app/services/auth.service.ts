import { Injectable } from '@angular/core';
import { UserForLogin } from '../model/user';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {login_DTO} from "../model/login_DTO";
import {RegisterDTO} from "../model/RegisterDTO";
import {Users_DTO} from "../model/Users_DTO";  // Assuming this model is appropriate

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.baseUrl
  constructor(private http: HttpClient) { }

  Login(data:login_DTO): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`+'/Account/login',data);
  }

  Register(data:RegisterDTO): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`+'/Account/register',data);
  }

  Get_all_users(): Observable<Users_DTO[]> {
    return this.http.get<Users_DTO[]>(`${this.baseUrl}`+'/Account/users');
  }
}
