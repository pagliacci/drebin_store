import { Product } from '../models/product';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';


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

@Injectable({
    providedIn: 'root'
})
export class StoreService {
    productsUrl = '/api/store/products';

    constructor(private http: HttpClient) {}

    getProductList(): Observable<Product[]> {
        return of(productsMock);
        return this.http.get<Product[]>(this.productsUrl);
    }

    order(productId: number): Observable<void> {
        return of();
    }
}
