import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProjectService} from "../../../services/project.service";
import {AlertifyService} from "../../../services/alertify.service";
import {AssigningService} from "../../../services/assigning.service";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-affectation-project',
  templateUrl: './affectation-project.component.html',
  styleUrls: ['./affectation-project.component.css']
})
export class AffectationProjectComponent implements OnInit {
  projectForm: FormGroup;
  projectId!: any;
  project: any;
  users: any[] = [];
  users_forAffect: any[] = [];
  displayedColumns: string[] = ['userId', 'username', 'email', 'role', 'action'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private assignService: AssigningService,
    private authService: AuthService,
    private alert: AlertifyService
  ) {
    this.projectForm = this.fb.group({
      userId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id');
    this.loadProject();
    this.loadUsers();
  }

  loadProject(): void {
    this.assignService.getProjectAssignments(this.projectId).subscribe({
      next: (response: any) => {
        this.project = response;
        this.users = response.users;
      },
      error: (error:any) => {
        this.alert.error('Error loading project assignments');
      }
    });
  }

  loadUsers(): void {
    this.authService.Get_all_users().subscribe({
      next: (response: any[]) => {
        this.users_forAffect = response;
      },
      error: (error) => {
        this.alert.error('Error loading users');
      }
    });
  }

  assignUser(): void {
    if (this.projectForm.valid) {
      const assignData = {
        userId: this.projectForm.value.userId,
        projectId: this.projectId
      };
      console.log(assignData);

      this.assignService.assignUserToProject(assignData).subscribe({
        next: (res) => {
          this.alert.success(res.message);
          this.loadProject(); // Reload the project assignments
        },
        error: (err) => {
          this.alert.error('Error assigning user');
        }
      });
    }
  }

  unassignUser(userId: string): void {
    const unassignData = {
      userId: userId,
      projectId: this.projectId
    };
    console.log(unassignData);

    this.assignService.unassignUserFromProject(unassignData).subscribe({
      next: (res:any) => {
        this.alert.success(res.message);
        this.loadProject(); // Reload the project assignments
      },
      error: (err:any) => {
        this.alert.error('Error unassigning user');
      }
    });
  }

  backToProjects(): void {
    this.router.navigate(['/projects']);
  }

  onUserSelectionChange(event: any) {
    console.log(event.value);
  }

}
