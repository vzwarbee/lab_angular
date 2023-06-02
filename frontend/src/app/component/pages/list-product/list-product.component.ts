import { Component } from '@angular/core';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent {
  listProduct: any[] = [];
  LProduct: any[] = [];
  _listFilter: string = '';

  url_img = 'assets/images/'
  constructor() {

  }
  ngOnInit() {
    // this.getProduct();
  }




}
