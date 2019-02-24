import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Product } from '../models/product';

@Component({
    selector: 'app-product-preview',
    templateUrl: './product-preview.component.html',
    styleUrls: ['./product-preview.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductPreviewComponent {
    @Input()
    product: Product;
}
