import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/services/alertify.service';
import jwt_decode from 'jwt-decode';
import {Router} from "@angular/router";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser!: any;

  constructor(private alertify: AlertifyService,private router:Router) { }

  ngOnInit(): void {
    this.currentUser = jwt_decode(localStorage.getItem('token') as string);
    //console.log("decoded", this.currentUser)
  }

  onLogout(){
    localStorage.removeItem('token');
     this.alertify.success("You are logged out !");
     this.router.navigate(['login'])
  }

}
