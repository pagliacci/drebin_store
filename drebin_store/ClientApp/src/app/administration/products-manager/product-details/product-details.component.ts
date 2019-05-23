import { Component, Output, Input, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ProductsManagerService } from '../services/products-manager.service';
import { Product } from 'src/app/store/models/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.less']
})
export class ProductDetailsComponent {
  @Input()
  product: Product;

  @Output()
  goBackClick: EventEmitter<void> = new EventEmitter();

  constructor(
    private productsManagerService: ProductsManagerService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  handleGoBackClick() {
    this.goBackClick.emit();
  }

  handleDeleteClick() {
    this.productsManagerService.deleteProduct(this.product.id);
  }
}
