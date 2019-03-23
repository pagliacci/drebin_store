import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/store/models/product';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.less']
})
export class ProductsListComponent {
  @Input()
  products: Product[];

  @Output()
  productSelected: EventEmitter<Product> = new EventEmitter();

  handleClick(product: Product) {
    this.productSelected.emit(product);
  }
}
