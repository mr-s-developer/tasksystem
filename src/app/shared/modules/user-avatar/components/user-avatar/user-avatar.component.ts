import { Component, Input } from '@angular/core';
import { User } from '../../../../types/users';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrl: './user-avatar.component.scss'
})
export class UserAvatarComponent {

  @Input() user: User | null | undefined = null;
  @Input() size: string = 'average';
}
