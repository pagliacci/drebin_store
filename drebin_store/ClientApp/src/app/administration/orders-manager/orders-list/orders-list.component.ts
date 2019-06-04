import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { Order } from '../models/order';
import { OrderState } from '../models/order-state';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersListComponent {

  @Input()
  orders: Order[];

  @Output()
  orderSelected: EventEmitter<Order> = new EventEmitter();

  filterValue: string;
  includeCompletedOrders = false;

  get ordersToDisplay() {
    return this.orders &&
      this.orders
        .filter(o => (!this.filterValue || o.user.username.indexOf(this.filterValue) >= 0))
        .filter(o => (!this.includeCompletedOrders || o.orderState === OrderState.inProgress));
  }

  handleClick(order: Order) {
    this.orderSelected.emit(order);
  }

  handleFilterInput(filterValue: string) {
    this.filterValue = filterValue;
  }

  handleCompletedOrdersCheckbox(includeCompletedOrders: boolean) {
    this.includeCompletedOrders = includeCompletedOrders;
  }
}
