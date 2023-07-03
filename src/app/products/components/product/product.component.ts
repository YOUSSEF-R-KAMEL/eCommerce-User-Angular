import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IProduct } from '../../models/iproduct';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  @Input() item!: IProduct
  @Output() SelectedItem = new EventEmitter()
  addCard: boolean = false
  amount:number = 0

  constructor(){
  }

  add(){
    this.SelectedItem.emit({item: this.item, quantity: this.amount})
  }

}
