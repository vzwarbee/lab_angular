import { Component } from '@angular/core';
import { ProductService } from 'src/app/service/product-service/product-service.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  listProduct: any
  constructor(private _productService: ProductService
  ) {
  }

  ngOnInit() {
    this.getProduct()
  }

  getProduct() {
    this._productService.getProduct().subscribe({
      next: (res) => {
        this.listProduct = res;
        console.log(res);

      },
      error: (res) => {
        console.error(res);
      }
    });
  }
}
