import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Order } from '../models/order';

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

  handleClick(order: Order) {
    this.orderSelected.emit(order);
  }
}
