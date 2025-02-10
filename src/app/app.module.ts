import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './admin/home/home.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ProjectsComponent } from './admin/dashboard/projects/projects.component';
import { TasksComponent } from './admin/dashboard/tasks/tasks.component';
import { TeamsComponent } from './admin/dashboard/teams/teams.component';
import { TodooComponent } from './admin/dashboard/tasks/todoo/todoo.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ModelComponent } from './admin/dashboard/tasks/model/model.component';
import { HttpClientModule } from '@angular/common/http';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import{MatPaginatorModule} from '@angular/material/paginator';
import{MatSortModule} from '@angular/material/sort';
import{MatDialogModule} from '@angular/material/dialog';
import{MatCheckboxModule} from '@angular/material/checkbox';
import { ChartModule } from 'angular-highcharts';

import{FormsModule} from '@angular/forms';
import {MatDialogActions} from'@angular/material/dialog';
import { WorkingActivityComponent } from './admin/working-activity/working-activity.component';
import { ProjectCategoryComponent } from './admin/project-category/project-category.component';
import { TasksDistributionComponent } from './admin/tasks-distribution/tasks-distribution.component';
import { TaskActivityComponent } from './admin/task-activity/task-activity.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MatListModule } from '@angular/material/list';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { TeamCardComponent } from './admin/dashboard/teams/team-card/team-card.component';
import { TeamListComponent } from './admin/dashboard/teams/team-list/team-list.component';
import { TeamDetailsComponent } from './admin/dashboard/teams/team-details/team-details.component';
import {MatTableModule} from "@angular/material/table";
import { AddProjectModalComponent } from './angular_modals/add-project-modal/add-project-modal.component';
import { UpdateProjectModalComponent } from './angular_modals/update-project-modal/update-project-modal.component';
import { DeleteProjectModalComponent } from './angular_modals/delete-project-modal/delete-project-modal.component';
import { AffectationProjectComponent } from './admin/dashboard/affectation-project/affectation-project.component';
import {MatSelectModule} from "@angular/material/select";
import { TaskModalComponent } from './angular_modals/task-modal/task-modal.component';
import { ColumnChartComponent } from './admin/column-chart/column-chart.component';
import { DeleteTaskModalComponent } from './angular_modals/delete-task-modal/delete-task-modal.component';
import { UpdateTaskModalComponent } from './angular_modals/update-task-modal/update-task-modal.component';







@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    DashboardComponent,
    ProjectsComponent,
    TasksComponent,
    TeamsComponent,
    TodooComponent,
    WorkingActivityComponent,
    ProjectCategoryComponent,
    TasksDistributionComponent,
    TaskActivityComponent,
    LoginComponent,
    RegisterComponent,
    TeamCardComponent,
    TeamListComponent,
    TeamDetailsComponent,
    AddProjectModalComponent,
    UpdateProjectModalComponent,
    DeleteProjectModalComponent,
    AffectationProjectComponent,
    TaskModalComponent,
    ColumnChartComponent,
    DeleteTaskModalComponent,
    UpdateTaskModalComponent,





  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    DragDropModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatCheckboxModule,
    FormsModule,
    ChartModule,
    MatListModule,
    BsDropdownModule.forRoot(),
    MatTableModule,
    MatSelectModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
