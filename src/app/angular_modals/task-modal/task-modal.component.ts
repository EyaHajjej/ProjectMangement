import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import jwt_decode from "jwt-decode";
import {ProjectTaskService} from "../../services/project-task.service";

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.css']
})
export class TaskModalComponent implements OnInit {
  taskForm!: FormGroup;
  isEditEnabled!:boolean;
  currentUser!:any;
  constructor(
    public dialogRef: MatDialogRef<TaskModalComponent>,
    private projectTaskService:ProjectTaskService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.currentUser = jwt_decode(localStorage.getItem('token') as string);
    //console.log()
    this.isEditEnabled = this.data.isEditEnabled;

    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      endDate: [null, Validators.required],
      status: ['ToDo', Validators.required],
      projectId: [this.data.projectId, Validators.required],
      userId:[this.currentUser.id]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const formData = this.taskForm.value;
      this.projectTaskService.AddTask(formData).subscribe({
        next:()=>{
          this.dialogRef.close(formData);
        },
        error :(err:any)=>{

      }
      })

    }
  }
}
