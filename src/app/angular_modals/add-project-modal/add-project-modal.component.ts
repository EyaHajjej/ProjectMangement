import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {ProjectService} from "../../services/project.service";
import {Response as rs} from "../../model/Response";

@Component({
  selector: 'app-add-project-modal',
  templateUrl: './add-project-modal.component.html',
  styleUrls: ['./add-project-modal.component.css']
})
export class AddProjectModalComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<AddProjectModalComponent>,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(formValue: any): void {
    this.projectService.addProject(formValue).subscribe({
      next: (res: any) => {
        console.log('Project added successfully:', res);
        this.dialogRef.close(res);
      },
      error: (error: any) => {
        console.error('Error adding project:', error);
        this.dialogRef.close({ success: false });
      }
    });
  }
}
