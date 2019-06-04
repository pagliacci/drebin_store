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

  get isCompleteButtonDisabled() {
    return this.order.orderState !== OrderState.inProgress;
  }

  get isCancelButtonDisabled() {
    return this.order.orderState !== OrderState.inProgress;
  }

  constructor(
    private ordersManagerService: OrdersManagerService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  handleComplete() {
    // Looks like ugly kostyl', but it's ok for now
    const order = Object.assign(new Order(), this.order);
    order.orderState = OrderState.completed;
    this.ordersManagerService.completeOrder(order).subscribe(o => this.order = o);
  }

  handleCancel() {
    // Looks like ugly kostyl', but it's ok for now
    const order = Object.assign(new Order(), this.order);
    order.orderState = OrderState.cancelled;
    this.ordersManagerService.completeOrder(order).subscribe(o => this.order = o);
  }

  handleGoBackClick() {
    this.goBackClick.emit();
  }
}
