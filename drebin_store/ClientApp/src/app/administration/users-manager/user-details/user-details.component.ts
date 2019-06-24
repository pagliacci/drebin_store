import {
  Component, Input, Output, ChangeDetectionStrategy, OnChanges, SimpleChanges, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user';
import { UsersManagerService } from '../services/users-manager.service';
import { QuestStage } from './quest-stage.model';
import { MainQuestStage, MainQuestStageMap } from 'src/app/models/main-quest-stage';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailsComponent implements OnChanges {

  @Input()
  user: User;

  @Output()
  goBackClick: EventEmitter<void> = new EventEmitter();

  questStages: QuestStage[];

  dpIncrements = [-500, -100, -50, 50, 100, 500];

  constructor(
    private usersManagerService: UsersManagerService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  grantPoints(increment: number) {
    const user = this.cloneUser(this.user);
    user.drebinPoints += increment;
    this.usersManagerService.updateUser(user); // .then(u => this.user = u);
  }

  updateMainQuestStage(newStage: QuestStage) {
    const user = this.cloneUser(this.user);
    user.mainQuestStage = newStage.stage;
    this.usersManagerService.updateUser(user); // .then(u => this.user = u);
  }

  updateCurrentQuest(questNumber: number) {
    const user = this.cloneUser(this.user);
    user.numberOfQuestInCurrentAct = questNumber;
    this.usersManagerService.updateUser(user); // .then(u => this.user = u);
    this.changeDetectorRef.detectChanges();
    this.changeDetectorRef.markForCheck();
  }

  private cloneUser(user: User) {
    return Object.assign(new User(), user);
  }

  handleGoBackClick() {
    this.goBackClick.emit();
  }

  sendNotification() {
    this.usersManagerService.sendNotification(this.user.id);
  }

  isIncrementDisabled(increment: number) {
    return this.user.drebinPoints + increment < 0;
  }

  getQuestsForActButtons() {
    const numberOfQuests = this.usersManagerService.getNumberOfQuests(this.user.mainQuestStage);
    return Array.from({length: numberOfQuests}, (v, k) => k);
  }

  ngOnChanges(changes: SimpleChanges) {
    const questStages = [];
    let isStageAvailable = false;
    MainQuestStageMap.forEach((value, key) => {
      const questStage = new QuestStage(key, value, isStageAvailable, this.user.mainQuestStage === key);
      if (this.user.mainQuestStage === key) {
        isStageAvailable = true;
      }
      questStages.push(questStage);
    });
    this.questStages = questStages;
  }
}
