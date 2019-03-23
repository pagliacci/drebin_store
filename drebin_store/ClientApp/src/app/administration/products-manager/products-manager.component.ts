import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/store/models/product';
import { ProductsManagerService } from './services/products-manager.service';

@Component({
  selector: 'app-products-manager',
  templateUrl: './products-manager.component.html',
  styleUrls: ['./products-manager.component.less']
})
export class ProductsManagerComponent implements OnInit {
  products$: Observable<Product[]>;
  selectedProduct: Product;

  constructor(private productsManagerService: ProductsManagerService) { }

  handleProductSelected(product: Product) {
    this.selectedProduct = product;
  }

  handleDetailsBackClick() {
    this.selectedProduct = null;
  }

  ngOnInit() {
    this.products$ = this.productsManagerService.getProducts();
  }
}
