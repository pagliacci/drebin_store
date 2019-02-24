import { Component, OnInit } from '@angular/core';
import { StoreService } from './services/store.service';
import { Product } from './models/product';

@Component({
    selector: 'app-store',
    templateUrl: 'store.component.html',
    styleUrls: ['store.component.less']
})
export class StoreComponent implements OnInit {
    products: Product[];
    availablePoints: number;
    selectedProduct: Product;

    constructor(private storeService: StoreService) {}

    handleCardClick(product: Product) {
        this.selectedProduct = product;
    }

    handleOrderClick() {
        this.storeService.order(this.selectedProduct.id);
    }

    ngOnInit() {
        this.getProducts();
        this.availablePoints = 302647; // TODO: make user service which must contain this number
    }

    getProducts(): void {
        this.storeService.getProductList()
            .subscribe(p => this.products = p);
    }
}
