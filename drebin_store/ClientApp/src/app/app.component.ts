import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  isLoggedIn: Observable<boolean>;

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn;
  }
}
