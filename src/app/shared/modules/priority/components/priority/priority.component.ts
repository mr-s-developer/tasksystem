import { Component, Input, OnInit } from '@angular/core';
import { Priority } from '../../types/priority';

@Component({
  selector: 'app-priority',
  templateUrl: './priority.component.html',
  styleUrl: './priority.component.scss'
})
export class PriorityComponent implements OnInit {

  @Input() id: string = '';

  public priority: Priority | undefined = undefined;
  
  private list: Priority[] = [
    {
      id: 'high',
      name: 'Высокий',
      class: 'priority-high'
    },
    {
      id: 'average',
      name: 'Средний',
      class: 'priority-average'
    },
    {
      id: 'low',
      name: 'Низкий',
      class: 'priority-low'
    }
  ]

  ngOnInit(): void {
    if(this.id){
      this.priority = this.list.find(item => item.id === this.id);
    }
  }
}
