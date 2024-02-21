import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PriorityComponent } from './components/priority/priority.component';

@NgModule({
  declarations: [PriorityComponent],
  imports: [CommonModule],
  exports: [PriorityComponent],
})
export class PriorityModule {}
