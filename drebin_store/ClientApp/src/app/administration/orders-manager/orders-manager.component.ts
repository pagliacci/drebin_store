import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Order } from './models/order';
import { Observable } from 'rxjs';
import { OrdersManagerService } from './services/orders-manager.service';

@Component({
  selector: 'app-orders-manager',
  templateUrl: './orders-manager.component.html',
  styleUrls: ['./orders-manager.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersManagerComponent implements OnInit {

  orders$: Observable<Order[]>;
  selectedOrder: Order;

  constructor(private ordersManagerService: OrdersManagerService) { }

  handleOrderSelected(order: Order) {
    this.selectedOrder = order;
  }

  handleDetailsBackClick() {
    this.selectedOrder = null;
  }

  ngOnInit() {
    this.orders$ = this.ordersManagerService.getOrders();
  }
}
