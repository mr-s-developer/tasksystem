import { Component, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

import { authActions } from '../../../../../auth/store/actions';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrl: './left-menu.component.scss'
})
export class LeftMenuComponent {

  public badgeTeam: number = 3;
  public isHover: string = '';
  public isActive: string = '';

  constructor(
    private store: Store
  ){}

  isActiveChange(event: any, name: string): void {
    if(event && this.isActive != name){
      this.isActive = name;
    }
    else if(!event && this.isActive == name){
      this.isActive = '';
    }
  }

  isHoverChange(event: boolean, name: string): void {
    this.isHover = event ? name : '';
  }

  logout(): void {
    this.store.dispatch(authActions.logout());
  }
}
