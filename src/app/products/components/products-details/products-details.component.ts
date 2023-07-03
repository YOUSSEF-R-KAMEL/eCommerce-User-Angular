import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { IProduct } from '../../models/iproduct';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss']
})
export class ProductsDetailsComponent implements OnInit {
  id:any
  item: any
  loading: boolean = false;

  constructor(private route: ActivatedRoute, private services: ProductsService){
    this.id = this.route.snapshot.paramMap.get('id')
    console.log(this.id)
  }
  ngOnInit(): void {
    this.getProductByID()
  }

  getProductByID(){
    this.loading = true
    this.services.getProductByID(this.id).subscribe((res: any) => {
      this.loading = false
      this.item = res
    },err => {
      this.loading = false
      alert(err)
    })
  }


}
