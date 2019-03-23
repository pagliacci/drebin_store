import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/store/models/product';
import { map } from 'rxjs/operators';

const getProductsUrl = '/api/store/products';
const updaProductUrl = '/api/administration/updateProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductsManagerService {
  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(getProductsUrl);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(updaProductUrl, product)
      .pipe(map(p => Object.assign(new Product(), p)));
  }
}
