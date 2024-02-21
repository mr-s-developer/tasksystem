import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';

import { MatDialogClose, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { StoreModule } from '@ngrx/store';

import { LoginComponent } from './components/login/login.component';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { notAuthGuard } from './guards/not-auth.guard';
import { authFeatureKey, authReducer } from './store/reducers';
import * as authEffects from './store/effects';
import { BackendErrorMessagesModule } from '../shared/modules/backend-error-messages/backend-error-messages.module';

const routes: Routes = [
  { path: 'login', component: LoginComponent, title: 'Авторизация', canActivate: [notAuthGuard] },
];

@NgModule({
  declarations: [
    LoginComponent, 
    LoginDialogComponent, 
    LoginDialogComponent
  ],
  imports: [
    CommonModule, 
    RouterModule.forChild(routes), 
    FormsModule, 
    ReactiveFormsModule,

    MatDialogModule, 
    MatDialogClose, 
    MatButtonModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatIconModule,

    StoreModule.forFeature(authFeatureKey, authReducer),
    EffectsModule.forFeature(authEffects),

    BackendErrorMessagesModule,
  ],
})
export class AuthModule {}
