import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

const getUsersUrl = '/api/administration/getUsers';
const updateUserUrl = '/api/administration/updateUser';

@Injectable({
  providedIn: 'root'
})
export class UsersManagerService {

  constructor(private http: HttpClient) { }

  getUser(id): Observable<User> {
    const params = new HttpParams().set('userId', id.toString());
    return this.http.get<User>(getUsersUrl, {
      params: params
    });
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(getUsersUrl);
  }

  updateUser(user: User): Observable<User> {
    return this.http.post<User>(updateUserUrl, user);
  }
}
