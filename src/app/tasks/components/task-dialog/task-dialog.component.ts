import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { usersActions } from '../../../shared/store/actions';
import { selectUsers } from '../../../shared/store/reducers';
import { CreateTask, Task, TaskDialogData } from '../../types/tasks';
import { User } from '../../../shared/types/users';
import { tasksActions } from '../../store/actions';
import { selectCreatedTask } from '../../store/reducers';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrl: './task-dialog.component.scss'
})
export class TaskDialogComponent implements OnInit, OnDestroy {

  public form: FormGroup = this.fb.group({
    date:         [new Date(), [Validators.required]],
    title:        ['', [Validators.required]],
    description:  [''],
    priority:     ['average', [Validators.required]],
    userId:       ['', [Validators.required]],
  });
  private subscriptions: Subscription = new Subscription();
  public users$: Observable<User[] | null | undefined> = this.store.select(selectUsers);
  public task$: Observable<CreateTask | null | undefined> = this.store.select(selectCreatedTask);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TaskDialogData,
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    private fb: FormBuilder,
    private store: Store
  ){}

  ngOnInit(): void {
    this.responseSaveTask();
    this.requestUserList();
    if(this.data && this.data.state == 'view' && this.data.task){
      this.initForm();
    }
  }

  ngOnDestroy(): void {
    if(this.subscriptions){
      this.subscriptions.unsubscribe();
    }
  }

  initForm(): void {
    this.form.setValue({
      date:         this.data.task?.date,
      title:        this.data.task?.title,
      description:  this.data.task?.description,
      priority:     this.data.task?.priority,
      userId:       this.data.task?.userId
    });
  }

  requestUserList(): void {
    this.store.dispatch(usersActions.userList());
  }

  requestSaveTask(state: string = ''): void {
    let form: Task = this.form.value;
    let date: string = new Date(form.date).toISOString().split('T')[0];
    let task: CreateTask = {
      date:         date,
      title:        form.title,
      description:  form.description,
      priority:     form.priority,
      userId:       form.userId
    }
    this.store.dispatch(tasksActions.taskCreate(task));
  }

  responseSaveTask(): void {
    this.subscriptions.add(
      this.task$.subscribe(response => {
        if(response){
          this.dialogRef.close(true);
        }
      })
    );
  }
}
