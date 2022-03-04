import { Component, OnInit } from '@angular/core';
import { ShareServiceService } from '../share-service.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {
  productList :any[]= [];

  constructor(private _service : ShareServiceService) { }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList(){
     this._service.productList.subscribe(res => {
      this.productList = res.filter(obj => obj.quantityCart);
    });
  }

  get total() {
    let total = 0;
       this.productList.filter(obj => {
        total = total + obj.quantityCart * obj.price;
    });
    return total;
  }

  removeItem(product:any){
    this._service.removeCartItem(product);
  }

}
