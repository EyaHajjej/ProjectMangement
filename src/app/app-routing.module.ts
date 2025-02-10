import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './admin/home/home.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ProjectsComponent } from './admin/dashboard/projects/projects.component';
import { TasksComponent } from './admin/dashboard/tasks/tasks.component';
import { TeamsComponent } from './admin/dashboard/teams/teams.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { TeamDetailsComponent } from './admin/dashboard/teams/team-details/team-details.component';
import {AuthGuard} from "./Guard/auth.guard";
import {AffectationProjectComponent} from "./admin/dashboard/affectation-project/affectation-project.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: '', component: HomeComponent, canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard] },
      { path: 'projects/affectation/:id', component: AffectationProjectComponent, canActivate: [AuthGuard] },
      { path: 'projects/tasks/:id', component: TasksComponent, canActivate: [AuthGuard] },
      { path: 'teams', component: TeamsComponent, canActivate: [AuthGuard] },
      { path: 'team-details/:id', component: TeamDetailsComponent, canActivate: [AuthGuard] },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
