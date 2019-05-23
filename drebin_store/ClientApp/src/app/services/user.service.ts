import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';
import * as JwtDecode from 'jwt-decode';
import { JwtToken } from '../models/jwt-token';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SignalrService } from './signalr.service';

const loginUrl = './api/users/authenticate';
const registerUrl = './api/users/register';
const getUserUrl = './api/users/getUser';
const updateNotificationDataUrl = './api/users/updateNotificationData';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    currentUserSubj: BehaviorSubject<User>;

    get currentUser() {
        return this.currentUserSubj.getValue();
    }

    constructor(private http: HttpClient, private router: Router, private signalrService: SignalrService) {
        this.currentUserSubj = new BehaviorSubject(this.localStorageUser);

        signalrService.user.subscribe(user => {
            if (user.id === this.currentUser.id) {
                user.token = this.currentUser.token;
                this.localStorageUser = user;
                this.currentUserSubj.next(user);
            }
        });
    }

    login(username: string, password: string) {
        return this.http.post<User>(loginUrl, { username: username, password: password })
            .pipe(map(u => {
                const user = Object.assign(new User(), u);
                if (user && user.token) {
                    this.currentUserSubj.next(user);
                    this.localStorageUser = user;
                }

                return user;
            }));
    }

    logout() {
        this.currentUserSubj.next(null);
        this.localStorageUser = null;
        this.router.navigate(['/login']);
    }

    register(user: User) {
        return this.http.post(registerUrl, user);
    }

    updateUserData(): void {
        this.http.get<User>(getUserUrl).toPromise().then(u => {
            const user = Object.assign(new User(), u);
            user.token = this.currentUser.token;
            this.localStorageUser = user;
            this.currentUserSubj.next(user);
        });
    }

    sendNotificationData(notificationSubscriptionString: string) {
        this.http.post(updateNotificationDataUrl, notificationSubscriptionString);
    }

    private get currentUserDecodedToken(): JwtToken {
        return this.currentUser != null && this.currentUser.token != null
            ? JwtDecode<JwtToken>(this.currentUser.token)
            : null;
    }

    isTokenValid(): boolean {
        const token = this.currentUserDecodedToken;
        return token != null && Date.now() / 1000 < token.exp;
    }

    private get localStorageUser(): User {
        return Object.assign(new User(), JSON.parse(localStorage.getItem('currentUser')));
    }

    private set localStorageUser(user: User) {
        localStorage.setItem('currentUser', JSON.stringify(user));
    }
}
