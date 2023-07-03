import { Component, OnInit } from '@angular/core';
import { CartsService } from '../../services/carts.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartProducts: any[] = [];
  total: number = 0;
  successSend = false;
  constructor(private services: CartsService) {}

  ngOnInit(): void {
    this.addToCard();
  }

  addToCard() {
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
      // console.log(this.cartProducts)
    }
    this.getTotalPrice();
  }

  getTotalPrice() {
    this.total = 0;
    for (let x in this.cartProducts) {
      this.total +=
        this.cartProducts[x].item.price * this.cartProducts[x].quantity;
    }
  }

  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    this.getTotalPrice();
  }

  minAmount(i: number) {
    this.cartProducts[i].quantity--;
    this.saveCart();
  }

  addAmount(i: number) {
    this.cartProducts[i].quantity++;
    this.saveCart();
  }

  deletePrd(i: number) {
    this.cartProducts.splice(i, 1);
    this.saveCart();
  }

  clearProducts() {
    this.cartProducts = [];
    this.saveCart();
  }

  sendCartToAPI() {
    let products = this.cartProducts.map((item) => {
      return { productId: item.item.id, quantity: item.quantity };
    });

    let model = {
      userID: 5,
      date: new Date(),
      products: products,
    };
    this.services.createNewCart(model).subscribe((res: any) => {
      this.successSend = true;
    }, (err) => {
      alert(err)
    });
  }
}
