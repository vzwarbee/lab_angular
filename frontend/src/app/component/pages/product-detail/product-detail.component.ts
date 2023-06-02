import { Component } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {

  url: string
  id: string
  idNumber: number
  detailProduct: any

  constructor() {
    this.url = window.location.href;
    this.id = this.url.substring(this.url.lastIndexOf('/') + 1);

    this.idNumber = parseInt(this.id, 10);
  }

  ngOnInit(): void {
    // this.getProduct()
  }




  // getProduct() {
  //   this._userService.getProductDetail(this.idNumber).subscribe({
  //     next: (res) => {
  //       this.detailProduct = res

  //     },
  //     error: (err) => {
  //       console.error(err)
  //     }
  //   })

  // }
}
