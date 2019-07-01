import { Injectable } from '@angular/core';
import { CodecContacts } from './codec-contacts';
import { CodecContact } from './models/codec-contact';
import { AvailableContacts, CodecData, Call, MultiMessageCall } from './codec-data';
import { UserService } from '../services/user.service';
import { MainQuestStage } from '../models/main-quest-stage';

@Injectable({
    providedIn: 'root' // TODO: provide for code module?
})
export class CodecService {

    constructor(private userService: UserService) {}

    getContact(frequency: string): CodecContact {
        const contact = CodecContacts.list.find(c => c.frequency === frequency);
        const currentUser = this.userService.currentUser;
        if (contact.name === CodecContacts.otacon.name && currentUser.mainQuestStage === MainQuestStage.Act4) {
            contact.viewUrl = './assets/codec/otacon_no_glasses.jpg';
        }
        return contact;
    }

    getCodecData(contact: CodecContact): Call[] | MultiMessageCall[] {
        const currentUser = this.userService.currentUser;
        const mainQuestStage = currentUser.mainQuestStage;
        const numberOfQuestInCurrentAct = currentUser.numberOfQuestInCurrentAct;

        const act = CodecData[mainQuestStage];
        const quest = act[numberOfQuestInCurrentAct];
        const data = quest[contact.name];

        return data;
    }

    getAvailableContacts(): CodecContact[] {
        const currentUser = this.userService.currentUser;
        return AvailableContacts[currentUser.mainQuestStage][currentUser.numberOfQuestInCurrentAct];
    }
}
