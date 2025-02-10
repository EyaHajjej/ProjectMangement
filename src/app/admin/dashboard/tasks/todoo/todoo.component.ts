import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ITask } from '../model/task';

@Component({
  selector: 'app-todoo',
  templateUrl: './todoo.component.html',
  styleUrls: ['./todoo.component.css']
})
export class TodooComponent implements OnInit {
  range !: FormGroup;
  todoForm!: FormGroup; // Ensure non-null assertion is used correctly
  tasks: ITask[] = [];
  inProgress: ITask[] = []; // CamelCase naming convention
  done: ITask[] = [];
  updateIndex?: number; // Use a more appropriate type instead of any
  isEditEnabled: boolean = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item: ['', Validators.required]
    });
    this.range = this.fb.group({
      start: [null, Validators.required],
      end: [null, Validators.required]
    });
  // Listen to value changes and log errors
  this.range.valueChanges.subscribe(val => {
    console.log(this.range.errors, this.range.status);
  });
  }

  addTask() {
/*    if (this.todoForm.valid) {
      this.tasks.push({
        description: this.todoForm.value.item,
        done: false
      });
      this.todoForm.reset();
    }*/
  }

  onEdit(item: ITask, i: number) {
    this.todoForm.controls['item'].setValue(item.description);
    this.updateIndex = i;
    this.isEditEnabled = true;
  }

  updateTask() {
/*    if (this.todoForm.valid && this.updateIndex != null) {
      this.tasks[this.updateIndex].description = this.todoForm.value.item;
      this.tasks[this.updateIndex].status = false;
      this.todoForm.reset();
      this.updateIndex = undefined;
      this.isEditEnabled = false;
    }*/
  }

  deleteTask(i: number) {
    this.tasks.splice(i, 1);
  }

  deleteInProgressTask(i: number) {
    this.inProgress.splice(i, 1); // Adjusted to camelCase
  }

  deleteDoneTask(i: number) {
    this.done.splice(i, 1);
  }

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
