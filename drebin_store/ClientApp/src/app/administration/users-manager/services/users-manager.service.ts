import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SignalrService } from 'src/app/services/signalr.service';

const getUsersUrl = '/api/administration/getUsers';
const updateUserUrl = '/api/administration/updateUser';
const sendNotificationUrl = '/api/administration/sendNotification';

@Injectable({
  providedIn: 'root'
})
export class UsersManagerService {

  users: Observable<User[]>;

  constructor(private http: HttpClient, private signalrService: SignalrService) {
    this.users = Observable.create((observer) => {
      let users: User[];
      const subscription = this.getUsers().subscribe((data) => {
        users = data;
        observer.next(users);
        subscription.unsubscribe();
      });

      signalrService.user.subscribe((user) => {
        users = users.map(u => {
          const mappedUser = new User(u);
          if (u.id === user.id) {
            mappedUser.drebinPoints = user.drebinPoints;
            mappedUser.mainQuestStage = user.mainQuestStage;
          }
          return mappedUser;
        });
        // const userToUpdate = users.find(u => u.id === user.id);
        // if (userToUpdate != null) {
        //   // userToUpdate.canManageOrders = user.canManageOrders;
        //   // userToUpdate.canManageProducts = user.canManageProducts;
        //   // userToUpdate.canManageUsers = user.canManageUsers;
        //   userToUpdate.mainQuestStage = user.mainQuestStage;
        //   userToUpdate.drebinPoints = user.drebinPoints;
        // } else {
        //   users.push(user);
        // }
        observer.next(users);
      });
    });
  }

  getUser(id): Observable<User> {
    const params = new HttpParams().set('userId', id.toString());
    return this.http.get<User>(getUsersUrl, {
      params: params
    });
  }

  private getUsers(): Observable<User[]> {
    return this.http.get<User[]>(getUsersUrl);
  }

  updateUser(user: User): Observable<User> {
    return this.http.post<User>(updateUserUrl, user);
  }

  sendNotification(userId: number) {
    return this.http.post(sendNotificationUrl, userId).toPromise();
  }
}
