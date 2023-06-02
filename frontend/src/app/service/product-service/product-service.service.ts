import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseConfigService } from 'src/app/ultis/base-config.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _baseConfig: BaseConfigService, private _httpClient: HttpClient) { }

  getProduct(): Observable<any> {
    return this._httpClient.get(`${this._baseConfig.base_url}product`)
  }
}
