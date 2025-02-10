import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Users_DTO} from "../../../model/Users_DTO";
import {Response} from "../../../model/Response";
import {Role} from "../../../model/Role";
import {AlertifyService} from "../../../services/alertify.service";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  users:Users_DTO[]=[]
  constructor(private authService:AuthService,private alert: AlertifyService,) { }

  ngOnInit(): void {
    this.loadUsers()
  }

  loadUsers(): void {
    this.authService.Get_all_users().subscribe({
      next: (response: Users_DTO[]) => {
        if (response) {
          this.users = response;
        } else {
          this.alert.success('error get users');
        }
      },
      error: (error) => {
        this.alert.success('error method');
      }
    });
  }

}
