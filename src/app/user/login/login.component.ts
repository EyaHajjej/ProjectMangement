import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,Validators} from '@angular/forms';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import {login_DTO} from "../../model/login_DTO";
import {StorageService} from "../../services/storage.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';

  private fb: FormBuilder;

  constructor(fb: FormBuilder,
              private router:Router,
              private authService: AuthService,
              private storageService:StorageService,
              private alert:AlertifyService)

              {
    this.fb = fb;

  }

  ngOnInit(): void {


    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }



  onLogin(): void {
    if (this.loginForm.valid) {
      const credentials: login_DTO = this.loginForm.value;
      this.authService.Login(credentials).subscribe({
        next: response => {
          this.alert.success('Login successful');
          this.storageService.setItem('token',response.token);
          this.router.navigate(['dashboard']);
        },
        error: error => {
          this.errorMessage = 'Login failed. Please try again.';
          this.alert.error(this.errorMessage);
          this.loginForm.reset();
        },
        complete: () => {
          console.log('Login request completed');
        }
      });
    }
  }

}
