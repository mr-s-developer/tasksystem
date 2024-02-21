import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersistenceService {

  constructor() { }

  set(key: string, data: any): void {
    try{
      localStorage.setItem(key, JSON.stringify(data));
    }
    catch(e){
      console.error('Error saving to localStorge', e);
    }
  }

  get(key: string): any {
    try{
      return JSON.parse(<any>localStorage.getItem(key));
    }
    catch(e){
      console.error('Error getting data from localStorge', e);
      return null;
    }
  }

  remove(key: string): void {
    try{
      localStorage.removeItem(key);
    }
    catch(e){
      console.error('Error removing from localStorge', e);
    }
  }
}
