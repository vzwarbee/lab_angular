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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { EmpAddEditComponent } from './component/pages/emp-add-edit/emp-add-edit.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';


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
    EmpAddEditComponent,
    ProductDetailComponent,



  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
