import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderState } from '../models/order-state';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Order } from '../models/order';
import { SignalrService } from 'src/app/services/signalr.service';

const getOrdersUrl = '/api/administration/getOrders';
const completeOrderUrl = '/api/administration/completeOrder';

@Injectable({
  providedIn: 'root'
})
export class OrdersManagerService {

  orders: Observable<Order[]>;

  constructor(private http: HttpClient, private signalrService: SignalrService) {
    this.orders = Observable.create((observer) => {
      let orders: Order[];
      const subscription = this.getOrders().subscribe((data) => {
        orders = data;
        observer.next(orders);
        subscription.unsubscribe();
      });

      signalrService.order.subscribe((order) => {
        orders = orders.map(o => {
          const mappedOrder = new Order(o);
          if (o.id === order.id) {
            mappedOrder.orderState = order.orderState;
            mappedOrder.completionTimeStamp = order.completionTimeStamp;
          }
          return mappedOrder;
        });
        // const userToUpdate = users.find(u => u.id === user.id);
        // if (userToUpdate != null) {
        //   // userToUpdate.canManageOrders = user.canManageOrders;
        //   // userToUpdate.canManageProducts = user.canManageProducts;
        //   // userToUpdate.canManageUsers = user.canManageUsers;
        //   userToUpdate.mainQuestStage = user.mainQuestStage;
        //   userToUpdate.drebinPoints = user.drebinPoints;
        // } else {
        //   users.push(user);
        // }
        observer.next(orders);
      });
    });
  }

  private getOrders(userId?: number, orderState?: OrderState): Observable<Order[]> {
    let params = new HttpParams();
    if (userId != null) {
      params = params.set('userId', userId.toString());
    }
    if (orderState != null) {
      params = params.set('orderState', orderState.toString());
    }
    return this.http.get<Order[]>(getOrdersUrl, {
      params: params
    });
  }

  completeOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(completeOrderUrl, order);
  }
}
