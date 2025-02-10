import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProjectService} from "../../services/project.service";
import {AlertifyService} from "../../services/alertify.service";
import {Project} from "../../model/project_dto";

@Component({
  selector: 'app-update-project-modal',
  templateUrl: './update-project-modal.component.html',
  styleUrls: ['./update-project-modal.component.css']
})
export class UpdateProjectModalComponent implements OnInit {

  projectForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private alert: AlertifyService,
    private dialogRef: MatDialogRef<UpdateProjectModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Project
  ) {
    this.projectForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      name: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    //console.log(this.data.id)
    if (this.data) {
      this.projectForm.patchValue(this.data);
    }
  }

  save(): void {
    if (this.projectForm.valid) {
      const adjustedStartDate = new Date(this.projectForm.value.startDate);
      adjustedStartDate.setDate(adjustedStartDate.getDate() + 1);

      const adjustedEndDate = new Date(this.projectForm.value.endDate);
      adjustedEndDate.setDate(adjustedEndDate.getDate() + 1);

      const updatedProject: Project = {
        ...this.projectForm.getRawValue(),
        startDate: adjustedStartDate,
        endDate: adjustedEndDate
      };

      this.projectService.updateProject(this.data.id,updatedProject).subscribe({
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
