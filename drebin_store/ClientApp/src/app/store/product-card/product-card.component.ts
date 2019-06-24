import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Product } from '../models/product';

@Component({
    selector: 'app-product-card',
    templateUrl: 'product-card.component.html',
    styleUrls: ['product-card.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent {
    @Input()
    product: Product;
}
