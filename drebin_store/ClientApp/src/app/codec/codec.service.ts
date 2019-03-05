import { Injectable } from '@angular/core';
import { CodecModule } from './codec.module';
import { CodecContacts } from './codec-contacts';
import { CodecContact } from './models/codec-contact';
import { RandomQuotes } from './random-quotes';

@Injectable({
    providedIn: 'root' // TODO: provide for code module?
})
export class CodecService {
    getContact(frequency: string): CodecContact {
        return CodecContacts.list.find(c => c.frequency === frequency);
    }

    getCodectText(contact: CodecContact, mainQuestStage: MainQuestStage) {
        const randomQuotes = RandomQuotes[contact.name];
        if (randomQuotes != null) {
            return randomQuotes[Math.floor(Math.random() * randomQuotes.length)];
        }
        return `${contact.name} saying something actual for ${mainQuestStage} stage of quest`;
    }
}
