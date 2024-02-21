import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Store } from '@ngrx/store';

import { SortRef } from '../../../shared/types/sort';
import { Task, TaskList, TaskListRequest } from '../../types/tasks';
import { tasksActions } from '../../store/actions';
import { selectDeletedTask, selectTasks } from '../../store/reducers';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit, OnDestroy {

  public taskSortRef: SortRef[] = [{ field: 'date', fieldName: 'Дате', selected: true }]
  public selected: string | undefined = this.taskSortRef.find(item => item.selected)?.field;
  public displayedColumns: string[] = ['date', 'executor', 'priority', 'title', 'action'];
  public dataSource: Task[] = [];
  public paginator = {
    resultsLength: 0,
    pageSize: 10,
    pageIndex: 0,
    hidePageSize: true,
  }
  public paramsRequest: TaskListRequest = {
    sort:  '',
    order: '',
    page:  '1',
    limit: '10',
  }
  private subscriptions: Subscription = new Subscription();
  private taskList$ = this.store.select(selectTasks);
  private deletedTask$ = this.store.select(selectDeletedTask);
  private dialogCofig: MatDialogConfig = {
    panelClass: 'task-dialog',
    autoFocus: false,
    data: {}
  }

  constructor(
    public dialog: MatDialog,
    private store: Store
  ){}

  ngOnInit(): void {
    this.responseTaskList();
    this.responseRemoveTask();
    this.setSortParams(this.selected);
    this.requestTaskList();
  }

  ngOnDestroy(): void {
    if(this.subscriptions){
      this.subscriptions.unsubscribe();
    }
  }

  openCreateTaskDialog(): void {
    this.dialogCofig.data = { state: 'create', task: null }
    this.dialog.open(TaskDialogComponent, this.dialogCofig).afterClosed().subscribe((result) => {
      if(result){
        this.setPaginatorParams(0, 10);
        this.requestTaskList();
      }
    });
  }

  openViewTaskDialog(task: Task): void {
    this.dialogCofig.data = { state: 'view', task: task }
    this.dialog.open(TaskDialogComponent, this.dialogCofig).afterClosed().subscribe((result) => { });
  }

  requestRemoveTask(event: MouseEvent, taskId: number): void {
    event.stopPropagation();
    if(confirm("Подтвердить удаление?")){
      this.store.dispatch(tasksActions.taskRemove(taskId));
    }
  }

  responseRemoveTask(): void {
    this.subscriptions.add(
      this.deletedTask$.subscribe((response: number | null) => {
        if(response){
          this.setPaginatorParams(0, 10);
          this.requestTaskList();
        }
      })
    );
  }

  requestTaskList(): void {
    this.store.dispatch(tasksActions.taskList(this.paramsRequest));
  }

  responseTaskList(): void {
    this.subscriptions.add(
      this.taskList$.subscribe((response: TaskList | null | undefined) => {
        if(response){
          this.paginator.resultsLength = response.paginatorResultsLength;
          this.dataSource = response.list ? response.list : [];
        }
      })
    );
  }

  selectionChange(event: MatSelectChange): void {
    this.setSortParams(<string | undefined>event.value);
    this.requestTaskList();
  }

  paginatorEvent(event: PageEvent): void {
    this.setPaginatorParams(event.pageIndex, event.pageSize);
    this.requestTaskList();
  }

  setSortParams(field: string | undefined): void {
    this.paramsRequest = {
      page:  this.paramsRequest.page,
      limit: this.paramsRequest.limit,
      sort:  field,
      order: 'desc'
    }
  }

  setPaginatorParams(pageIndex: number, pageSize: number): void {
    this.paramsRequest = {
      page:  String(pageIndex + 1),
      limit: String(pageSize),
      sort:  this.paramsRequest.sort,
      order: this.paramsRequest.order
    }
  }
}