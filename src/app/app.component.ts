import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectIsAuthenticated } from './shared/store/selectors';
import { AppState } from './shared/types/app-state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  
  public isAuthenticated$ = this.store.select(selectIsAuthenticated);

  constructor(
    private store: Store<AppState>
  ){}
}
