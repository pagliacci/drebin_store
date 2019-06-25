import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SignalrService } from 'src/app/services/signalr.service';
import { MainQuestStage } from 'src/app/models/main-quest-stage';

const getUsersUrl = '/api/administration/getUsers';
const updateUserUrl = '/api/administration/updateUser';
const sendNotificationUrl = '/api/administration/sendNotification';

const questsPerAct = {
  [MainQuestStage.Act1]: 8,
  [MainQuestStage.Act2]: 3,
  [MainQuestStage.Act3]: 4,
  [MainQuestStage.Act4]: 5,
  [MainQuestStage.Act5]: 5
};

@Injectable({
  providedIn: 'root'
})
export class UsersManagerService {

  users: Observable<User[]>;

  constructor(private http: HttpClient, private signalrService: SignalrService) {
    this.users = Observable.create((observer) => {
      let users: User[];
      this.getUsers().then((data) => {
        users = data;
        observer.next(users);
      });

      signalrService.user.subscribe((user) => {
        users = users.map(u => {
          const mappedUser = new User(u);
          if (u.id === user.id) {
            mappedUser.drebinPoints = user.drebinPoints;
            mappedUser.mainQuestStage = user.mainQuestStage;
            mappedUser.numberOfQuestInCurrentAct = user.numberOfQuestInCurrentAct;
          }
          return mappedUser;
        });
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

  private getUsers(): Promise<User[]> {
    return this.http.get<User[]>(getUsersUrl).toPromise()
      .then(u => u.sort(function(a, b) {
        const nameA = a.username.toLowerCase();
        const nameB = b.username.toLowerCase();
        return nameA.localeCompare(nameB);
      }));
  }

  updateUser(user: User): Promise<User> {
    return this.http.post<User>(updateUserUrl, user).toPromise();
  }

  sendNotification(userId: number) {
    return this.http.post(sendNotificationUrl, userId).toPromise();
  }

  getNumberOfQuests(mainQuestStage: MainQuestStage): number {
    return questsPerAct[mainQuestStage];
  }
}
