import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/pages/Home/home.component';
import { ListProductComponent } from './component/pages/list-product/list-product.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' }, // Đường dẫn mặc định chuyển hướng đến '/home'
    { path: 'home', component: HomeComponent }, // Route cho trang Home, HomeComponent là tên của component tương ứng
    { path: 'products', component: ListProductComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }