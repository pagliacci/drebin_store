import { Component, OnInit } from '@angular/core';
import { StoreService } from './services/store.service';
import { Product } from './models/product';
import { UserService } from '../services/user.service';

@Component({
    selector: 'app-store',
    templateUrl: 'store.component.html',
    styleUrls: ['store.component.less']
})
export class StoreComponent implements OnInit {
    products: Product[];
    availablePoints: number;
    selectedProduct: Product;

    constructor(private storeService: StoreService, private userService: UserService) {}

    handleCardClick(product: Product) {
        this.selectedProduct = product;
    }

    handleOrderClick() {
        this.storeService.order(this.selectedProduct.id)
            .then(() => this.availablePoints = this.userService.currentUser.drebinPoints);
    }

    ngOnInit() {
        this.getProducts();
        this.userService.currentUserSubj.subscribe(u => this.availablePoints = u.drebinPoints);
    }

    getProducts(): void {
        this.storeService.getProductList()
            .subscribe(p => this.products = p);
    }
}
