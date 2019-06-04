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

  dpIncrements = [50, 100, 500];

  constructor(
    private usersManagerService: UsersManagerService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  grantPoints(increment: number) {
    this.user.drebinPoints += increment;
    this.usersManagerService.updateUser(this.user).subscribe(u => this.user = u);
  }

  updateMainQuestStage(newStage: QuestStage) {
    this.user.mainQuestStage = newStage.stage;
    this.usersManagerService.updateUser(this.user).subscribe(u => this.user = u);
  }

  handleGoBackClick() {
    this.goBackClick.emit();
  }

  sendNotification() {
    this.usersManagerService.sendNotification(this.user.id);
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
