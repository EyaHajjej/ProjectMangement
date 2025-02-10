import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertifyService} from 'src/app/services/alertify.service';
import {AuthService} from 'src/app/services/auth.service';
import {UserForRegister} from 'src/app/model/user';
import {UserService} from 'src/app/services/user.service';
import {RoleService} from "../../services/role.service";
import {Role} from "../../model/Role";
import {Response} from "../../model/Response";
import {Router} from "@angular/router";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerForm!: FormGroup;
    roles: Role[] = [];


    constructor(
        private fb: FormBuilder,
        private roleService: RoleService,
        private authService:AuthService,
        private alert: AlertifyService,
        private router:Router,
    ) {
    }

    ngOnInit(): void {
        this.loadRoles();
        this.registerForm = this.fb.group({
            username: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            role: ['', [Validators.required]]
        });
    }

    loadRoles(): void {
        this.roleService.getAllRoles().subscribe({
            next: (response: Response<Role[]>) => {
                if (response.success) {
                    this.roles = response.data;
                    console.log(this.roles);
                } else {
                    this.alert.success('error get roles');
                }
            },
            error: (error) => {
                this.alert.error('error get roles');
            }
        });
    }

    onRegister(): void {
        console.log(this.registerForm.value)
        if (this.registerForm.valid) {
            const registrationData = this.registerForm.value;
            this.authService.Register(registrationData).subscribe(
                (response:any) => {
                  if (response.succeeded){
                    this.router.navigate(['login'])
                      this.alert.success('Registration successful');
                  }else {
                      this.alert.success('Registration failed');
                  }

                },
                (error:any) => {
                    this.alert.error('Registration failed. Please try again.');
                }
            );
        }
    }
}

