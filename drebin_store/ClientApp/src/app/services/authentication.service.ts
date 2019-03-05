import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs';

const loginUrl = './api/users/authenticate';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    private loggedIn = new BehaviorSubject<boolean>(this.hasUser());

    get isLoggedIn() {
        return this.loggedIn.asObservable();
    }

    login(username: string, password: string) {
        return this.http.post<User>(loginUrl, { username: username, password: password })
            .pipe(map(user => {
                if (user && user.token) {
                    this.loggedIn.next(true);
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            }));
    }

    logout() {
        this.loggedIn.next(false);
        localStorage.removeItem('currentUser');
    }

    private hasUser() {
        return localStorage.getItem('currentUser') != null;
    }
}
