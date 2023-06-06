import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from './component/UI/card/card.component';
import { HomeComponent } from './component/pages/Home/home.component';
import { UserDetailComponent } from './component/pages/user-detail/user-detail.component'
import { CardPostComponent } from './component/UI/card-post/card-post.component';
import { StarComponent } from './component/UI/star/star.component';
import { ListProductComponent } from './component/pages/list-product/list-product.component';
import { ProductDetailComponent } from './component/pages/product-detail/product-detail.component';
import { PostComponent } from './component/pages/post/post.component';
import { AppRoutingModule } from './app.routing';
import { ProductCardComponent } from './component/UI/card/product-card/product-card.component';
import { FooterComponent } from './component/pages/footer/footer.component';
import { HeaderComponent } from './component/pages/header/header.component';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCommonModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';

registerLocaleData(en);


@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    CardPostComponent,
    HomeComponent,
    UserDetailComponent,
    ProductDetailComponent,
    StarComponent,
    ListProductComponent,
    PostComponent,
    ProductCardComponent,
    FooterComponent,
    HeaderComponent


  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatCommonModule,
    MatPaginatorModule

  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
