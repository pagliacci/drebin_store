import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter, OnChanges } from '@angular/core';
import { Product } from '../models/product';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-product-preview',
    templateUrl: './product-preview.component.html',
    styleUrls: ['./product-preview.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductPreviewComponent implements OnChanges {
    @Input()
    product: Product;

    @Output()
    orderClick: EventEmitter<Product> = new EventEmitter<Product>();

    orderButtonDisabled = false;

    constructor(private userService: UserService) { }

    ngOnChanges() {
        this.orderButtonDisabled = this.product.price > this.userService.currentUser.drebinPoints;
    }

    handleOrderClick() {
        this.orderClick.emit(this.product);
    }
}
