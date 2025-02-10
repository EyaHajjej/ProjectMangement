import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, CdkDragMove, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {ITask} from "./model/task";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {TaskModalComponent} from "../../../angular_modals/task-modal/task-modal.component";
import jwt_decode from "jwt-decode";
import {ProjectTaskService} from "../../../services/project-task.service";
import {AlertifyService} from "../../../services/alertify.service";
import {DeleteProjectModalComponent} from "../../../angular_modals/delete-project-modal/delete-project-modal.component";
import {DeleteTaskModalComponent} from "../../../angular_modals/delete-task-modal/delete-task-modal.component";
import {UpdateProjectModalComponent} from "../../../angular_modals/update-project-modal/update-project-modal.component";
import {UpdateTaskModalComponent} from "../../../angular_modals/update-task-modal/update-task-modal.component";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  range!: FormGroup;
  todoForm!: FormGroup;
  tasks: ITask[] = [];
  inProgress: ITask[] = [];
  toConfirmOrBug: ITask[] = [];
  Finished: ITask[] = [];
  updateIndex?: number;
  isEditEnabled: boolean = false;
  currentUser!:any;
  actual_task!:any;
  constructor(private fb: FormBuilder,
              private http: HttpClient,
              private alert: AlertifyService,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private projectTaskService:ProjectTaskService
              ) { }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item: ['', Validators.required]
    });
    this.range = this.fb.group({
      start: [null, Validators.required],
      end: [null, Validators.required]
    });

    // Fetch tasks from the API
    this.loadTasks();
  }

  loadTasks() {
    this.currentUser = jwt_decode(localStorage.getItem('token') as string);
    const projectId = this.route.snapshot.paramMap.get('id');
    this.http.get<ITask[]>(`https://localhost:44360/api/Tasks/project/${projectId}/user/${this.currentUser.id}`).subscribe({
      next: (response: ITask[]) => {
        this.tasks = response.filter(task => task.status === 'ToDo');
        this.inProgress = response.filter(task => task.status === 'InProgress');
        this.toConfirmOrBug = response.filter(task => task.status === 'ToConfirmOrBug');
        this.Finished = response.filter(task => task.status === 'Finished');
        console.log(this.Finished);
      },
      error: (error: any) => {
        console.error('Error loading tasks', error);
      }
    });

  }


  onEdit(item: any) {
    const selectedTask = this.tasks.find(task => task.id === item.id);
    const dialogRef = this.dialog.open(UpdateTaskModalComponent, {
      width: '500px',
      disableClose: false,
      data: selectedTask // Pass the selected project data
    });

    dialogRef.afterClosed().subscribe((response: any) => {
      if (response.success) {
        this.alert.success("Task updated");
        this.loadTasks();
      } else if (!response.success) {
        this.alert.error("Error updating Task");
      }
    });
  }

  deleteTask(i: number) {
    const dialogRef = this.dialog.open(DeleteTaskModalComponent, {
      width: '400px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.confirmed) {
        this.projectTaskService.DeleteTask(i).subscribe({
          next:(res:any)=>{
            if(res.message == 'success'){
              this.alert.success('Task deleted')
              this.loadTasks()
            }
          },
          error:()=>{
            this.alert.error('error when deleted')
          }
        })
      }
    });

  }

  deleteInProgressTask(i: number) {
    const dialogRef = this.dialog.open(DeleteTaskModalComponent, {
      width: '400px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.confirmed) {
        this.projectTaskService.DeleteTask(i).subscribe({
          next:(res:any)=>{
            if(res.message == 'success'){
              this.alert.success('Task deleted')
              this.loadTasks()
            }
          },
          error:()=>{
            this.alert.error('error when deleted')
          }
        })
      }
    });
  }

  deleteToConfirmOrBugTask(i: number) {
    const dialogRef = this.dialog.open(DeleteTaskModalComponent, {
      width: '400px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.confirmed) {
        this.projectTaskService.DeleteTask(i).subscribe({
          next:(res:any)=>{
            if(res.message == 'success'){
              this.alert.success('Task deleted')
              this.loadTasks()
            }
          },
          error:()=>{
            this.alert.error('error when deleted')
          }
        })
      }
    });
  }

  deleteDoneTask(i: number) {
    const dialogRef = this.dialog.open(DeleteTaskModalComponent, {
      width: '400px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result.confirmed) {
        this.projectTaskService.DeleteTask(i).subscribe({
          next:(res:any)=>{
            if(res.message == 'success'){
              this.alert.success('Task deleted')
              this.loadTasks()
            }
          },
          error:()=>{
            this.alert.error('error when deleted')
          }
        })
      }
    });
  }

  drop(event: CdkDragDrop<ITask[]>) {
    //console.log("id container", event.container.id)
    //console.log(this.actual_task)
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const updateObject={
        taskId : this.actual_task,
          status : parseInt( event.container.id)
      }
      this.projectTaskService.UpdateStatusTask(updateObject).subscribe({
        next :()=>{
          this.alert.success('task updated success');
        },
        error:()=>{
          this.alert.warning('error');
        }
      })
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  openAddTaskDialog() {
    const dialogRef = this.dialog.open(TaskModalComponent, {
      width: '400px',
      data: { isEditEnabled: this.isEditEnabled, projectId: this.route.snapshot.paramMap.get('id') }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.loadTasks();
        //console.log('Dialog closed', result);
      }
    });
  }

  onDragMoved(event: CdkDragMove<any>,item:any) {
    this.actual_task=item.id
    //console.log("item  : " ,item.id)
    //console.log("event  : " ,event)

  }
}
