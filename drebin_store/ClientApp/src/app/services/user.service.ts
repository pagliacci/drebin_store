import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';
import * as JwtDecode from 'jwt-decode';
import { JwtToken } from '../models/jwt-token';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

const loginUrl = './api/users/authenticate';
const registerUrl = './api/users/register';
const getUserUrl = './api/users/getUser';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    currentUserSubj: BehaviorSubject<User>;

    get currentUser() {
        return this.currentUserSubj.getValue();
    }

    constructor(
        private http: HttpClient,
        private router: Router) {
        this.currentUserSubj = new BehaviorSubject(this.localStorageUser);
    }

    login(username: string, password: string) {
        return this.http.post<User>(loginUrl, { username: username, password: password })
            .pipe(map(user => {
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
        this.http.get<User>(getUserUrl).toPromise().then(user => {
            const currentUser = this.currentUser;
            currentUser.drebinPoints = user.drebinPoints;
            currentUser.mainQuestStage = user.mainQuestStage;
            this.localStorageUser = currentUser;
            this.currentUserSubj.next(currentUser);
        });
    }

    get currentUserDecodedToken(): JwtToken {
        return this.currentUser != null ? JwtDecode<JwtToken>(this.currentUser.token) : null;
    }

    private get localStorageUser(): User {
        return JSON.parse(localStorage.getItem('currentUser'));
    }

    private set localStorageUser(user: User) {
        localStorage.setItem('currentUser', JSON.stringify(user));
    }
}
