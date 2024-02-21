import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormErrorsService {

  constructor() { }

  getErrorMessage(field: AbstractControl<any, any>): string | null {

    if(field.hasError('required')){
      return 'Вы должны ввести значение';
    }
    else if(field.hasError('email')){
      return 'Введите почту в формате @gmail.com';
    }

    return null;
  }
}
