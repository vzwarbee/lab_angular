import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from './component/UI/card/card.component';
import { HomeComponent } from './component/pages/Home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { CardPostComponent } from './component/UI/card-post/card-post.component';
import { StarComponent } from './component/UI/star/star.component';
import { ListProductComponent } from './component/pages/list-product/list-product.component';
import { ProductDetailComponent } from './component/pages/product-detail/product-detail.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'list-product',
    component: ListProductComponent
  },
  {
    path: 'product/:id',
    component: ProductDetailComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
]

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    CardPostComponent,
    HomeComponent,
    StarComponent,
    ListProductComponent,
    ProductDetailComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
