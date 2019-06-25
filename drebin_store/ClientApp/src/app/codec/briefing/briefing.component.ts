import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { briefingData, Act, usernamePlaceholder } from './briefing-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-briefing',
  templateUrl: './briefing.component.html',
  styleUrls: ['./briefing.component.less']
})
export class BriefingComponent {

  currentPageNumber = 0;
  act: Act;

  constructor(private userService: UserService, private router: Router) {
    const userQuestStage = userService.currentUser.mainQuestStage;
    this.act = briefingData[userQuestStage];
  }

  async onNextButtonClick() {
    if (this.currentPageNumber === this.act.pages.length - 1) {
      await this.userService.completeBriefing();
      this.router.navigate(['/codec']);
      return;
    }
    this.currentPageNumber++;
  }

  get currentPage() {
    return this.act && this.act.pages[this.currentPageNumber];
  }

  getContent(rawContent: string): string {
    return rawContent.replace(new RegExp(usernamePlaceholder, 'g'), this.userService.currentUser.username);
  }
}
