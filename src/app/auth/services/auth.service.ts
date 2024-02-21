import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { User } from '../../shared/types/users';
import { UsersService } from '../../shared/services/users.service';
import { PersistenceService } from '../../shared/services/persistence.service';
import { IsAuthenticatedRequest, LoginRequest } from '../types/auth';
import { selectIsAuthenticated } from '../store/reducers';
import { authActions } from '../store/actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private persistenceService: PersistenceService = inject(PersistenceService);
  private usersService: UsersService = inject(UsersService);
  private store: Store = inject(Store);
  public isAuthenticated: boolean = false;

  constructor() { 
    
    this.store.select(selectIsAuthenticated).subscribe((state: boolean) => {
      this.isAuthenticated = state;
    });

    if(this.persistenceService.get('accessToken')){
      setTimeout(()=>{
        this.store.dispatch(authActions.isAuthenticated({ accessToken: this.persistenceService.get('accessToken') }));
      }, 100);
    }
  }

  login(params: LoginRequest): Observable<User[]> {
    return this.usersService.getList({ email: params.email, password: params.password });
  }

  getUserByAccessToken(params: IsAuthenticatedRequest): Observable<User[]> {
    return this.usersService.getList({ accessToken: params.accessToken });
  }
}
