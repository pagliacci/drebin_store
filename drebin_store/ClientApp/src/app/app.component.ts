import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './services/user.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean;
  user: User;

  constructor(
    private userService: UserService) {}

  ngOnInit() {
    this.userService.currentUserSubj.subscribe(u => {
      this.isLoggedIn = u != null && this.userService.isTokenValid();
      this.user = u;
    });
    this.userService.updateUserData();
  }

  logout() {
    this.userService.logout();
  }
}
