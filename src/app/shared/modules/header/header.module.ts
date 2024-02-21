import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './components/header/header.component';
import { UserAvatarModule } from '../user-avatar/user-avatar.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, UserAvatarModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
