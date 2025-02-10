import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProjectService} from "../../services/project.service";
import {AlertifyService} from "../../services/alertify.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Project} from "../../model/project_dto";
import {ITask} from "../../admin/dashboard/tasks/model/task";
import {ProjectTaskService} from "../../services/project-task.service";

@Component({
  selector: 'app-update-task-modal',
  templateUrl: './update-task-modal.component.html',
  styleUrls: ['./update-task-modal.component.css']
})
export class UpdateTaskModalComponent implements OnInit {
  taskForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private projectTaskService: ProjectTaskService,
    private alert: AlertifyService,
    private dialogRef: MatDialogRef<UpdateTaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ITask
  ) {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      endDate: ['', Validators.required],
      userId:['', Validators.required],
    });
  }

  ngOnInit(): void {
    //console.log(this.data.id)
    if (this.data) {
      this.taskForm.patchValue(this.data);
    }
  }

  save(): void {
    if (this.taskForm.valid) {
      const adjustedEndate = new Date(this.taskForm.value.endDate);
      adjustedEndate.setDate(adjustedEndate.getDate() + 1);

      const updatedTask: ITask = {
        ...this.taskForm.getRawValue(),
        endDate : adjustedEndate
      };

      this.projectTaskService.UpdateTask(updatedTask,this.data.id).subscribe({
        next: () => {
          this.dialogRef.close({ success: true });
        },
        error: () => {
          this.dialogRef.close({ success: false });
        }
      });
    }
  }

  close(): void {
    this.dialogRef.close();
  }

}
