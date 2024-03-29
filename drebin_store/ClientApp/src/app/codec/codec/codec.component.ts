import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CodecContact } from '../models/codec-contact';
import { CodecService } from '../codec.service';
import { Router } from '@angular/router';
import { Call, MultiMessageCall } from '../codec-data';
import { LastSeenCodecEntry } from 'src/app/models/last-seen-codec-entry';
import { usernamePlaceholder } from '../briefing/briefing-data';

@Component({
    selector: 'app-codec',
    templateUrl: './codec.component.html',
    styleUrls: ['./codec.component.less']
})
export class CodecComponent implements OnInit {
    contact: CodecContact;

    isMultimessageCall: boolean;
    codecCall: Call;
    multiMessageCall: MultiMessageCall;
    multiMessageCallNumber: number;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private codecService: CodecService,
        private userService: UserService
    ) { }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            const frequency = params.get('frequency');
            this.contact = this.codecService.getContact(frequency);
        });

        const codecData = this.codecService.getCodecData(this.contact);
        const currentUser = this.userService.currentUser;

        if (!codecData) {
            this.codecCall = new Call('', '[Нет ответа]');
            return;
        }

        const lastSeenEntry = this.userService.getLastSeenCodecEntry(this.contact.name);
        const isActualEntry = lastSeenEntry &&
            lastSeenEntry.mainQuestStage === currentUser.mainQuestStage &&
            lastSeenEntry.numberOfQuest === currentUser.numberOfQuestInCurrentAct &&
            lastSeenEntry.numberOfCall < codecData.length - 1;
        const lastSeenCodecEntry = new LastSeenCodecEntry();
        lastSeenCodecEntry.mainQuestStage = currentUser.mainQuestStage;
        lastSeenCodecEntry.numberOfQuest = currentUser.numberOfQuestInCurrentAct;
        lastSeenCodecEntry.numberOfCall = 0;

        if (isActualEntry) {
            const numberOfCall = lastSeenEntry.numberOfCall + 1;
            this.handleCodecData(codecData[numberOfCall]);
            lastSeenCodecEntry.numberOfCall = numberOfCall;
            this.userService.setLastSeenCodecEntry(lastSeenCodecEntry, this.contact.name);
        } else {
            this.handleCodecData(codecData[0]);
            this.userService.setLastSeenCodecEntry(lastSeenCodecEntry, this.contact.name);
        }
    }

    private handleCodecData(data: Call | MultiMessageCall) {
        if (data instanceof Call) {
            this.codecCall = data;
            this.isMultimessageCall = false;
        }
        if (data instanceof MultiMessageCall) {
            this.multiMessageCall = data;
            this.isMultimessageCall = true;
            this.codecCall = data.messages[0];
            this.multiMessageCallNumber = 0;
        }
    }

    handleMainButtonClick() {
        if (this.isMultimessageCall) {
            this.multiMessageCallNumber++;
            if (this.multiMessageCallNumber > this.multiMessageCall.messages.length - 1) {
                this.endCall();
            } else {
                this.codecCall = this.multiMessageCall.messages[this.multiMessageCallNumber];
            }
        } else {
            this.endCall();
        }
    }

    handleAltButtonClick() {

    }

    getContent(rawContent: string): string {
        return rawContent.replace(new RegExp(usernamePlaceholder, 'g'), this.userService.currentUser.username);
    }

    private endCall() {
        this.router.navigate(['/codec']);
    }
}
