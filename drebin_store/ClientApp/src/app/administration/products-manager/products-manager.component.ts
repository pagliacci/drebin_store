import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/store/models/product';
import { ProductsManagerService } from './services/products-manager.service';

@Component({
  selector: 'app-products-manager',
  templateUrl: './products-manager.component.html',
  styleUrls: ['./products-manager.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsManagerComponent implements OnInit, OnDestroy {

  products: Product[];
  selectedProduct: Product;
  isProductAdderShown = false;

  serviceSubscription: Subscription;

  constructor(private productsManagerService: ProductsManagerService, private changeDetector: ChangeDetectorRef) { }

  handleProductSelected(product: Product) {
    this.selectedProduct = product;
  }

  handleDetailsBackClick() {
    this.selectedProduct = null;
  }

  handleAddProductButtonClick() {
    this.isProductAdderShown = true;
  }

  handleProductAdded() {
    this.isProductAdderShown = false;
  }

  handleProductAddCancel() {
    this.isProductAdderShown = false;
  }

  ngOnInit() {
    this.serviceSubscription = this.productsManagerService.products.subscribe((products) => {
      this.products = products;
      this.selectedProduct = this.selectedProduct != null ? products.find(o => o.id === this.selectedProduct.id) : null;
      this.changeDetector.detectChanges();
    });
  }

  ngOnDestroy() {
    this.serviceSubscription.unsubscribe();
  }
}
