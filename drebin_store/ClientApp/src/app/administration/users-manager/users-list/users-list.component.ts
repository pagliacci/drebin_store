import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent {
  @Input()
  users: User[];

  @Output()
  userSelected: EventEmitter<User> = new EventEmitter();

  handleClick(user: User) {
    this.userSelected.emit(user);
  }
}
