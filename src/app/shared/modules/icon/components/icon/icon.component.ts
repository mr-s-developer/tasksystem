import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss'
})
export class IconComponent {

  @Input('name') iconName: string = '';
  @Input('isHover') hover: string = '';
  @Input('isActive') active: string = '';
}
