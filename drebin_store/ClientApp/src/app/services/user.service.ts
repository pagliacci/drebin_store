import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';

const registerUrl = './api/users/register';
const getUserUrl = './api/users/getUser';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    currentUser: User; // TODO: try to make observable and subscribe everywhere when user data shown

    constructor(private http: HttpClient) {
        this.currentUser = this.getCurrentUser();
    }

    getCurrentUser(): User {
        return JSON.parse(localStorage.getItem('currentUser'));
    }

    register(user: User) {
        return this.http.post(registerUrl, user);
    }

    updateUserData(): void {
        this.http.get<User>(getUserUrl).toPromise().then(user => {
            this.currentUser = user;
        });
    }
}
