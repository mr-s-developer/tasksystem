import { Component, Input, OnInit } from '@angular/core';

import { BackendErrors } from '../../../../types/backend-errors';

@Component({
  selector: 'app-backend-error-messages',
  templateUrl: './backend-error-messages.component.html',
  styleUrl: './backend-error-messages.component.scss'
})
export class BackendErrorMessagesComponent implements OnInit {

  @Input() backendErrors: BackendErrors = {}

  public errorMessages: string[] = [];
  
  ngOnInit(): void {
    this.errorMessages = Object.keys(this.backendErrors).map((name: string) => {
      const messages = this.backendErrors[name].join(' ');
      return name == 'errors' ? messages : `${name} ${messages}`;
    });
  }
}
