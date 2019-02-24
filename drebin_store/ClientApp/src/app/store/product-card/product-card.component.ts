import { Component, Input, ChangeDetectionStrategy, Output } from '@angular/core';
import { Product } from '../models/product';
import { EventEmitter } from '@angular/core';

@Component({
    selector: 'app-product-card',
    templateUrl: 'product-card.component.html',
    styleUrls: ['product-card.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent {
    @Input()
    product: Product;

    @Output()
    click: EventEmitter<void> = new EventEmitter();

    onClick() {
        this.click.emit(null);
    }
}
