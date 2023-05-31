import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }


  getUser(): Observable<any> {
    return this._http.get("http://localhost:3000/user")
  }
  getUserDetail(id: number): Observable<any> {
    return this._http.get("http://localhost:3000/user/" + id)
  }
  getProductDetail(id: number): Observable<any> {
    return this._http.get("http://localhost:3000/product/" + id)
  }

  getProduct(): Observable<any> {
    return this._http.get("http://localhost:3000/product/")
  }


  addProduct(data: any): Observable<any> {
    return this._http.post("http://localhost:3000/product", data)
  }

  updateProduct(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/product/${id}`, data)
  }
  deleteProduct(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/product/${id}`)
  }
}
