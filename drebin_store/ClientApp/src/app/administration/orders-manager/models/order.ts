import { User } from 'src/app/models/user';
import { Product } from 'src/app/store/models/product';
import { OrderState } from './order-state';

export class Order {
    id: number;
    user: User;
    product: Product;
    orderState: OrderState;
    orderTimeStamp: Date;
    completionTimeStamp: Date;

    constructor(order?: Order) {
        if (order != null) {
            this.id = order.id;
            this.user = order.user;
            this.product = order.product;
            this.orderState = order.orderState;
            this.orderTimeStamp = order.orderTimeStamp;
            this.completionTimeStamp = order.completionTimeStamp;
        }
    }
}
