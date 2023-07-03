import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {
  @Input() title:string = ''
  @Input() items: any[] = [];
  @Output() selectedData = new EventEmitter()

  constructor(){}

  filter(event:any){
    this.selectedData.emit(event)
  }

}
