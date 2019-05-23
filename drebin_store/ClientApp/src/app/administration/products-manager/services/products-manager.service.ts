import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/store/models/product';
import { map } from 'rxjs/operators';
import { SignalrService } from 'src/app/services/signalr.service';

const getProductsUrl = '/api/store/products';
const updateProductUrl = '/api/administration/updateProduct';
const createProductUrl = '/api/administration/createProduct';
const deleteProductUrl = '/api/administration/deleteProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductsManagerService {

  products: Observable<Product[]>;

  constructor(private http: HttpClient, private signalrService: SignalrService) {
    this.products = Observable.create((observer) => {
      let products: Product[];
      const subscription = this.getProducts().subscribe((data) => {
        products = data;
        observer.next(products);
        subscription.unsubscribe();
      });

      signalrService.product.subscribe((product) => {
        products = products.map(p => {
          const mappedProduct = new Product(p);
          if (p.id === product.id) {
            mappedProduct.numberInStock = product.numberInStock;
          }
          return mappedProduct;
        });
        // const userToUpdate = users.find(u => u.id === user.id);
        // if (userToUpdate != null) {
        //   // userToUpdate.canManageOrders = user.canManageOrders;
        //   // userToUpdate.canManageProducts = user.canManageProducts;
        //   // userToUpdate.canManageUsers = user.canManageUsers;
        //   userToUpdate.mainQuestStage = user.mainQuestStage;
        //   userToUpdate.drebinPoints = user.drebinPoints;
        // } else {
        //   users.push(user);
        // }
        observer.next(products);
      });
    });
  }

  private getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(getProductsUrl);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(updateProductUrl, product)
      .pipe(map(p => Object.assign(new Product(), p)));
  }

  addProduct(product: Product): Promise<Product> {
    return this.http.post<Product>(createProductUrl, product)
      .pipe(map(p => Object.assign(new Product(), p))).toPromise();
  }

  deleteProduct(productId: number): Promise<Object> {
    return this.http.post(deleteProductUrl, productId).toPromise();
  }
}
