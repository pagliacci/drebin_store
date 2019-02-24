import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';

const registerUrl = './api/users/register';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient) {}

    getCurrentUser(): User {
        return JSON.parse(localStorage.getItem('currentUser'));
    }

register(user: User) {
        return this.http.post(registerUrl, user);
    }
}
