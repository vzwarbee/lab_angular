import { Component } from '@angular/core';
import { UserService } from 'src/app/service/service.service';


@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent {
  listProduct: any[] = [];
  LProduct: any[] = [];
  _listFilter: string = '';

  constructor(private _productServer: UserService) { }

  ngOnInit() {
    this.getProduct();
  }

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.listProduct = this.listFilter ?
      this.performFilter(this.listFilter) : this.LProduct;
  }

  performFilter(filterBy: string): any[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.LProduct.filter((product: any) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  getProduct() {
    this._productServer.getProduct().subscribe({
      next: (res) => {
        this.LProduct = res;
        this.listProduct = this.performFilter(this.listFilter);
      },
      error: (res) => {
        console.error(res);
      }
    });
  }


}
