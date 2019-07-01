import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { briefingData, Act, usernamePlaceholder } from './briefing-data';
import { Router } from '@angular/router';
import { CodecContacts } from '../codec-contacts';
import { MainQuestStage } from 'src/app/models/main-quest-stage';

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
    const page = this.act && this.act.pages[this.currentPageNumber];
    const currentUser = this.userService.currentUser;
    if (page.codecContact && page.codecContact.name === CodecContacts.otacon.name && currentUser.mainQuestStage === MainQuestStage.Act4) {
      page.codecContact.viewUrl = './assets/codec/otacon_no_glasses.jpg';
    }
    return page;
  }

  getContent(rawContent: string): string {
    const user = this.userService.currentUser;
    const name = user.vkData != null && user.vkData.first_name ? user.vkData.first_name : user.username;
    return rawContent.replace(new RegExp(usernamePlaceholder, 'g'), name);
  }
}
