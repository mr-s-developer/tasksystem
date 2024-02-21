import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { AuthState } from '../../types/auth';
import { selectIsAuthenticated } from '../../store/reducers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {

  public isAuthenticated$ = this.store.select(selectIsAuthenticated);
  private subscriptions: Subscription = new Subscription();
  private dialogCofig: MatDialogConfig = {
    backdropClass: 'login-dialog-backdrop',
    hasBackdrop: true,
    disableClose: true,
    panelClass: 'login-dialog',
    autoFocus: false
  }
  
  constructor(
    public dialog: MatDialog,
    private store: Store<{ auth: AuthState }>
  ) {}

  ngOnInit(): void {
    this.isAuthenticated();
  }

  ngOnDestroy(): void {
    if(this.subscriptions){
      this.subscriptions.unsubscribe();
    }
  }

  openDialog(): void {
    this.dialog.open(LoginDialogComponent, this.dialogCofig).afterClosed().subscribe(() => {});
  }

  isAuthenticated(): void {
    this.subscriptions.add(
      this.isAuthenticated$.subscribe((response: boolean) => {
        if(!response){
          this.openDialog();
        }
      })
    );
  }
}
