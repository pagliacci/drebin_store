import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderState } from '../models/order-state';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Order } from '../models/order';

const getOrdersUrl = '/api/administration/getOrders';
const completeOrderUrl = '/api/administration/completeOrder';

@Injectable({
  providedIn: 'root'
})
export class OrdersManagerService {

  constructor(private http: HttpClient) { }

  getOrders(userId?: number, orderState?: OrderState): Observable<Order[]> {
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
