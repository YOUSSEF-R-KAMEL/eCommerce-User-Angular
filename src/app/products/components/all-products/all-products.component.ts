import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { IProduct } from '../../models/iproduct';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
})
export class AllProductsComponent implements OnInit {
  products: IProduct[] = [];
  categories: string[] = [];
  loading: boolean = false;
  cartProducts: any[] = []

  constructor(private services: ProductsService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    this.loading = true
    this.services.getAllProducts().subscribe(
      (res: any) => {
        this.products = res;
        this.loading = false
      },
      (err) => {
        console.log('Error: ' + err.message);
        this.loading = false
      }
    );
  }

  getCategories() {
    this.loading = true
    this.services.getAllCategories().subscribe(
      (res: any) => {
        this.categories = res;
        this.loading = false
      },
      (err) => {
        alert('ERROR');
        this.loading = false
      }
    );
  }

  filterCategory(event: any) {
    let value = event.target.value;
    value == 'all' ? this.getProducts() : this.getProductsByCats(value);
  }

  getProductsByCats(value: string) {
    this.loading = true
    return this.services.getProductsByCats(value).subscribe((res: any) => {
      this.products = res;
      this.loading = false
    });
  }

  addToCard(event:any){
    if('cart' in localStorage){
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!)
      let exist = this.cartProducts.find(item => item.item.id == event.item.id)
      // check if product was chosen or not
      if(exist) {
        alert("this product already in your cart")
      }
      else {
        this.cartProducts.push(event)
        localStorage.setItem('cart', JSON.stringify(this.cartProducts))
        alert("Successful Added " + event.quantity + " items")
      }
    }
    else {
      this.cartProducts.push(event)
      localStorage.setItem('cart', JSON.stringify(this.cartProducts))
    }
  }
}
