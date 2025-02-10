import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-delete-task-modal',
  templateUrl: './delete-task-modal.component.html',
  styleUrls: ['./delete-task-modal.component.css']
})
export class DeleteTaskModalComponent implements OnInit {

  constructor(    private dialogRef: MatDialogRef<DeleteTaskModalComponent>,
  ) { }

  ngOnInit(): void {
  }
  confirmDelete(): void {
    this.dialogRef.close({ confirmed: true });
  }

  cancel(): void {
    this.dialogRef.close({ confirmed: false });
  }

}
