import { Injectable } from '@angular/core';
import { CodecContacts } from './codec-contacts';
import { CodecContact } from './models/codec-contact';
import { AvailableContacts, CodecData, Call, MultiMessageCall } from './codec-data';
import { UserService } from '../services/user.service';

@Injectable({
    providedIn: 'root' // TODO: provide for code module?
})
export class CodecService {

    constructor(private userService: UserService) {}

    getContact(frequency: string): CodecContact {
        return CodecContacts.list.find(c => c.frequency === frequency);
    }

    getCodecData(contact: CodecContact): Call[] | MultiMessageCall {
        const currentUser = this.userService.currentUser;
        const mainQuestStage = currentUser.mainQuestStage;
        const numberOfQuestInCurrentAct = currentUser.numberOfQuestInCurrentAct;

        const act = CodecData[mainQuestStage];
        const quest = act[numberOfQuestInCurrentAct];
        const data = quest[contact.name];

        return data;
    }

    getAvailableContacts() {
        const currentUser = this.userService.currentUser;
        return AvailableContacts[currentUser.mainQuestStage][currentUser.numberOfQuestInCurrentAct];
    }
}
