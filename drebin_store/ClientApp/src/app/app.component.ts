import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean;

  constructor(
    private userService: UserService) {}

  ngOnInit() {
    this.userService.currentUserSubj.subscribe(u => {
      this.isLoggedIn = u != null;
    });
  }

  logout() {
    this.userService.logout();
  }
}
