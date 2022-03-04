import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DATA_ITEMS } from './products';


@Injectable({
  providedIn: 'root'
})
export class ShareServiceService {
  products = DATA_ITEMS;
  productList = new BehaviorSubject(this.products);

  getProductList() {
    return this.productList;
  }
  setProductList(product: any) {
    this.productList.next(product)
  }

  addCartItem(item: any) {
      this.products.forEach(element => {
        if(element.id === item.id){
          element.quantity = element.quantity - 1;
          element.quantityCart = element.quantityCart + 1;
        }
      });
    this.productList.next( this.products);
  }

  removeCartItem(item: any) {
    this.products.forEach(element => {
      if(element.id === item.id){
        element.quantity = element.quantity + 1;
        element.quantityCart = element.quantityCart - 1;
      }
    });
  this.productList.next( this.products);
  }


}
