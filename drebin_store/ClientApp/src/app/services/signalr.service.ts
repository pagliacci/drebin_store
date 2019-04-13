import { Injectable } from '@angular/core';
import { HubConnectionBuilder, HubConnection, LogLevel } from '@aspnet/signalr';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user';
import { Product } from '../store/models/product';
import { Order } from '../administration/orders-manager/models/order';

// TODO: add disconnect handling
// TODO: move to service worker?

@Injectable({
    providedIn: 'root'
})
export class SignalrService {
    hubConnection: HubConnection;

    user = new Subject<User>();
    product = new Subject<Product>();
    order = new Subject<Order>();

    constructor() {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl('/signalRHub')
            .configureLogging(LogLevel.Information)
            .build();

        this.initListeners();

        this.hubConnection.start()
            .then(() => console.log('SignalR connection started'));
    }

    private initListeners() {
        // TODO: change to upsert and handle appropriately
        this.hubConnection.on('UpdateUser', data => {
            this.user.next(Object.assign(new User(), data as User));
        });
        this.hubConnection.on('UpdateProduct', data => {
            this.product.next(Object.assign(new Product(), data));
        });
        this.hubConnection.on('UpdateOrder', data => {
            this.order.next(Object.assign(new Order(), data));
        });
    }
}
