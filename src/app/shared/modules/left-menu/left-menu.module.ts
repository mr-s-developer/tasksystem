import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBadgeModule } from '@angular/material/badge';

import { LeftMenuComponent } from './components/left-menu/left-menu.component';
import { IconModule } from '../icon/icon.module';
import { AppRoutingModule } from '../../../app-routing.module';

@NgModule({
  declarations: [LeftMenuComponent],
  imports: [CommonModule, AppRoutingModule, IconModule, MatBadgeModule],
  exports: [LeftMenuComponent],
})
export class LeftMenuModule {}
