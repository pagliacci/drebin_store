import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Order } from '../models/order';
import { OrdersManagerService } from '../services/orders-manager.service';
import { OrderState } from '../models/order-state';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderDetailsComponent {

  @Input()
  order: Order;

  @Output()
  goBackClick: EventEmitter<void> = new EventEmitter();

  constructor(
    private ordersManagerService: OrdersManagerService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  handleComplete() {
    // this.order.orderState = OrderState.completed;
    // TODO: update UI model after successfull response and check other places !
    this.ordersManagerService.completeOrder(this.order).subscribe(o => this.order = o);
  }

  handleCancel() {
    // this.order.orderState = OrderState.cancelled;
    // TODO: update UI model after successfull response and check other places !
    this.ordersManagerService.completeOrder(this.order).subscribe(o => this.order = o);
  }

  handleGoBackClick() {
    this.goBackClick.emit();
  }
}
