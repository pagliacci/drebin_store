import { Component, Output, Input, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ProductsManagerService } from '../services/products-manager.service';
import { Product } from 'src/app/store/models/product';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-adder',
  templateUrl: './product-adder.component.html',
  styleUrls: ['./product-adder.component.less']
})
export class ProductAdderComponent {

  @Output()
  productAdded: EventEmitter<void> = new EventEmitter();

  @Output()
  cancelClick: EventEmitter<void> = new EventEmitter();

  productForm = this.formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', Validators.required, Validators.min(1)],
    iconUrl: [''],
    previewUrl: [''],
    numberInStock: ['']
  });

  constructor(
    private productsManagerService: ProductsManagerService,
    private formBuilder: FormBuilder
  ) { }

  handleSubmit() {
    if (!this.productForm.valid) {
      return;
    }
    const product: Product = {
      id: null,
      title: this.productForm.value.title,
      description: this.productForm.value.description,
      price: this.productForm.value.price,
      iconUrl: this.productForm.value.iconUrl,
      previewUrl: this.productForm.value.previewUrl,
      numberInStock: this.productForm.value.numberInStock
    };
    this.productsManagerService.addProduct(product).then(result => {
      this.productAdded.emit();
    });
  }

  handleCancelClick() {
    this.cancelClick.emit();
  }
}
