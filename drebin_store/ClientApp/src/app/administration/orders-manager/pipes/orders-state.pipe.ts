import { PipeTransform, Pipe } from '@angular/core';
import { OrderState } from '../models/order-state';

@Pipe({
    name: 'orderState'
})
export class OrderStatePipe implements PipeTransform {
    transform(value: OrderState) {
        switch (value) {
            case OrderState.inProgress:
                return 'In Progress';
            case OrderState.completed:
                return 'Completed';
            case OrderState.cancelled:
                return 'Cancelled';
        }
    }
}
