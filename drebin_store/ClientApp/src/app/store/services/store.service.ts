import { Product } from '../models/product';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';


const productsMock = <Product[]>[
    {
        id: 1,
        title: 'Bananas',
        price: 42,
        iconUrl: './assets/icons/bananas.svg',
        description: 'Bunch of tasty bananas',
        previewUrl: './assets/previews/bananas.png',
        numberInStock: 15,
    },
    {
        id: 2,
        title: 'Apple',
        price: 322,
        iconUrl: './assets/icons/apple.svg',
        description: 'Nice red apple',
        previewUrl: './assets/previews/apple.png',
        numberInStock: 10
    }
];

const productsUrl = '/api/store/products';
const orderUrl = '/api/store/order';

@Injectable({
    providedIn: 'root'
})
export class StoreService {
    constructor(private http: HttpClient, private userService: UserService) {}

    getProductList(): Observable<Product[]> {
        return this.http.get<Product[]>(productsUrl);
    }

    order(productId: number) {
        return this.http.post(orderUrl, productId).toPromise().then(() => {
            // this.userService.updateUserData();
        });
    }
}
