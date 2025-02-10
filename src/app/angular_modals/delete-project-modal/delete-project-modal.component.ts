import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-delete-project-modal',
  templateUrl: './delete-project-modal.component.html',
  styleUrls: ['./delete-project-modal.component.css']
})
export class DeleteProjectModalComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<DeleteProjectModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number, name: string }
  ) {}

  ngOnInit() {
  }

  confirmDelete(): void {
    this.dialogRef.close({ confirmed: true });
  }

  cancel(): void {
    this.dialogRef.close({ confirmed: false });
  }

}
