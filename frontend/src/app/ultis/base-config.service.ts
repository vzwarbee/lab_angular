import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseConfigService {
  base_url = 'http://localhost:8686/api/'
  constructor() {
  }
}
