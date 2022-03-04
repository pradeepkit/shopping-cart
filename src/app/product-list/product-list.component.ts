import { Component, OnInit } from '@angular/core';
import { ShareServiceService } from '../share-service.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList : any[] = [];

  constructor(private _service : ShareServiceService ) { }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList(){
    this._service.getProductList().subscribe(res=>{
      this.productList =  res;
    });

  }

  addInCart(product:any){
    this._service.addCartItem(product);
  }
}
