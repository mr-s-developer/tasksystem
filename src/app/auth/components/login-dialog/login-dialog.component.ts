import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';

import { FormErrorsService } from '../../../shared/services/form-errors.service';
import { selectCurrentUser, selectIsAuthenticated, selectIsSubbmiting, selectValidationError } from '../../store/reducers';
import { authActions } from '../../store/actions';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.scss',
  providers: [FormErrorsService]
})
export class LoginDialogComponent implements OnInit, OnDestroy {

  public passwordHide = true;
  public data$ = combineLatest({
    isSubbmiting:    this.store.select(selectIsSubbmiting),
    validationError: this.store.select(selectValidationError),
    success:         this.store.select(selectCurrentUser),
    isAuthenticated: this.store.select(selectIsAuthenticated)
  });
  public form: FormGroup = this.fb.group({
    email:    ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });
  private subscriptions: Subscription = new Subscription();

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    private fb: FormBuilder,
    private formErrorsService: FormErrorsService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.responseLogged();
  }

  ngOnDestroy(): void {
    if(this.subscriptions){
      this.subscriptions.unsubscribe();
    }
  }

  getFormErrorMessage(field: AbstractControl<any, any>): string | null {
    return this.formErrorsService.getErrorMessage(field);
  }

  requestLogin(): void {
    this.store.dispatch(authActions.login(this.form.value));
  }

  responseLogged(): void {
    this.subscriptions.add(
      this.data$.subscribe((response) => {
        if(response.isAuthenticated){
          this.dialogRef.close(true);
        }
      })
    );
  }
}
