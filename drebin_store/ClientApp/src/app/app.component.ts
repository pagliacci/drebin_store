import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from './models/user';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, AfterViewInit {

  isLoggedIn: boolean;
  user: User;

  constructor(
    private userService: UserService,
    private swPush: SwPush) {}

  ngOnInit() {
    this.userService.currentUserSubj.subscribe(u => {
      this.isLoggedIn = u != null && this.userService.isTokenValid();
      this.user = u;
    });
    this.userService.updateUserData();

    // window['VK'].init({
    //   'apiId': '7030474'
    // });

    if (this.isLoggedIn) {
      this.userService.updateNotificationInfo();
    }

    // this.swPush.messages.subscribe(message => {
    //   debugger;
    //   console.log(message);
    // });

    // this.afMessaging.requestToken
    //   .subscribe(
    //     (token) => {
    //       console.log('Permission granted! Save to the server!', token);
    //       this.afMessaging.messages
    //         .subscribe((message) => { console.log(message); });
    //     },
    //     (error) => {
    //       console.error(error);
    //     },
    //   );
  }

  ngAfterViewInit(): void {
    // if (!this.isLoggedIn) {
    //   window['VK'].Widgets.Auth('vk_auth', {
    //     'onAuth': function(data) {alert(`user ${data['uid']} authorized`); }
    //   });
    // }
  }

  logout() {
    this.userService.logout();
  }

  getUsernameIdString() {
    return `${this.user.username} (ID: ${this.user.id})`;
  }
}
