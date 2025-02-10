import { Component, OnInit } from '@angular/core';
import {StatsService} from "../../services/stats.service";
import jwt_decode from "jwt-decode";




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  UsersStats: any;
  currentUser: any;

  constructor(private statService: StatsService) { }

  ngOnInit(): void {
    this.currentUser = jwt_decode(localStorage.getItem('token') as string);

    this.statService.getTasksStatsByUser(this.currentUser.id).subscribe({
      next: (value: any) => {
        this.UsersStats = value;
        //console.log(this.UsersStats);
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

}
