import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogClose, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';

import { TaskListComponent } from './components/task-list/task-list.component';
import { authGuard } from '../shared/guards/auth.guard';
import { HeaderModule } from '../shared/modules/header/header.module';
import { PriorityModule } from '../shared/modules/priority/priority.module';
import { UserAvatarModule } from '../shared/modules/user-avatar/user-avatar.module';
import { BackendErrorMessagesModule } from '../shared/modules/backend-error-messages/backend-error-messages.module';
import { TaskDialogComponent } from './components/task-dialog/task-dialog.component';

import * as tasksEffects from './store/effects';
import * as usersEffects from '../shared/store/effects';
import { tasksFeatureKey, tasksReducer } from './store/reducers';
import { usersFeatureKey, usersReducer } from '../shared/store/reducers';

const routes: Routes = [
  { path: 'tasks', component: TaskListComponent, title: 'Управление задачами', canActivate: [authGuard] },
];

@NgModule({
  declarations: [
    TaskListComponent, 
    TaskDialogComponent],
  imports: [
    CommonModule, 
    RouterModule.forChild(routes), 
    FormsModule, 
    ReactiveFormsModule,
    
    HeaderModule, 
    UserAvatarModule, 
    PriorityModule, 
    
    MatButtonModule, 
    MatSelectModule, 
    MatCardModule, 
    MatTableModule, 
    MatIconModule, 
    MatPaginatorModule,
    MatDialogModule, 
    MatDialogClose,
    MatFormFieldModule, 
    MatInputModule, 
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,

    StoreModule.forFeature(tasksFeatureKey, tasksReducer),
    StoreModule.forFeature(usersFeatureKey, usersReducer),
    EffectsModule.forFeature(tasksEffects, usersEffects),

    BackendErrorMessagesModule,
  ],
  providers: [
    MatDatepickerModule,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline', floatLabel: 'never' } },
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' }
  ]
})
export class TasksModule {}
