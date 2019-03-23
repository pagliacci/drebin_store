import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UsersManagerService } from './services/users-manager.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users-manager',
  templateUrl: './users-manager.component.html',
  styleUrls: ['./users-manager.component.less']
})
export class UsersManagerComponent implements OnInit {

  users$: Observable<User[]>;
  selectedUser: User;

  constructor(private usersManagerService: UsersManagerService) { }

  handleUserSelected(user: User) {
    this.selectedUser = user;
  }

  handleDetailsBackClick() {
    this.selectedUser = null;
  }

  ngOnInit() {
    this.users$ = this.usersManagerService.getUsers();
  }
}
