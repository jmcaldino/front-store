import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { Product } from './../../models/product.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.url_api}/products/`);
  }

  getProduct(id: string): Observable<Product>{
    return this.http.get<Product>(`${environment.url_api}/products/${id}`);
  }
}
