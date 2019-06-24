import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent {

  filterValue: string;

  @Input()
  users: User[];

  @Output()
  userSelected: EventEmitter<User> = new EventEmitter();

  get usersToDisplay() {
    return this.users &&
      this.users
        .filter(u =>
          !this.filterValue ||
          u.username.toLowerCase().indexOf(this.filterValue.toLowerCase()) >= 0 ||
          u.id.toString().indexOf(this.filterValue) >= 0);
  }

  getUserQuestStage(user: User) {
    return `${user.mainQuestStage + 1} / ${user.numberOfQuestInCurrentAct + 1}`;
  }

  handleClick(user: User) {
    this.userSelected.emit(user);
  }

  handleFilterInput(filterValue: string) {
    this.filterValue = filterValue;
  }
}
