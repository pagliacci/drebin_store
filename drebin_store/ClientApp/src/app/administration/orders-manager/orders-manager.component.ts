import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Order } from './models/order';
import { OrdersManagerService } from './services/orders-manager.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-orders-manager',
  templateUrl: './orders-manager.component.html',
  styleUrls: ['./orders-manager.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersManagerComponent implements OnInit, OnDestroy {

  orders: Order[];
  selectedOrder: Order;

  serviceSubscription: Subscription;

  constructor(private ordersManagerService: OrdersManagerService, private changeDetector: ChangeDetectorRef) { }

  handleOrderSelected(order: Order) {
    this.selectedOrder = order;
  }

  handleDetailsBackClick() {
    this.selectedOrder = null;
  }

  ngOnInit() {
    this.serviceSubscription = this.ordersManagerService.orders.subscribe((orders) => {
      this.orders = orders;
      this.selectedOrder = this.selectedOrder != null ? orders.find(o => o.id === this.selectedOrder.id) : null;
      this.changeDetector.detectChanges();
    });
  }

  ngOnDestroy() {
    this.serviceSubscription.unsubscribe();
  }
}
