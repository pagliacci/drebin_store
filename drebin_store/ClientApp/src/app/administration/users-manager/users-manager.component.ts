import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/user';
import { UsersManagerService } from './services/users-manager.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users-manager',
  templateUrl: './users-manager.component.html',
  styleUrls: ['./users-manager.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersManagerComponent implements OnInit, OnDestroy {

  users: User[];
  selectedUser: User;

  serviceSubscription: Subscription;

  constructor(private usersManagerService: UsersManagerService, private changeDetector: ChangeDetectorRef) { }

  handleUserSelected(user: User) {
    this.selectedUser = user;
  }

  handleDetailsBackClick() {
    this.selectedUser = null;
  }

  ngOnInit() {
    this.serviceSubscription = this.usersManagerService.users.subscribe((users) => {
      this.users = users;
      this.selectedUser = this.selectedUser != null ? users.find(u => u.id === this.selectedUser.id) : null;
      this.changeDetector.detectChanges();
    });
  }

  ngOnDestroy() {
    this.serviceSubscription.unsubscribe();
  }
}
