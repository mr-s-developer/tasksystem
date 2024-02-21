import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../../../../types/app-state';
import { selectCurrentUser } from '../../../../store/selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  @Input('title') pageTitle: string = 'Page title';

  public currentUser$ = this.store.select(selectCurrentUser);

  constructor(
    private store: Store<AppState>
  ){}
}
