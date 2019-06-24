import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CodecContact } from '../models/codec-contact';
import { CodecService } from '../codec.service';
import { Router } from '@angular/router';
import { Call, MultiMessageCall } from '../codec-data';
import { LastSeenCodecEntry } from 'src/app/models/last-seen-codec-entry';

@Component({
    selector: 'app-codec',
    templateUrl: './codec.component.html',
    styleUrls: ['./codec.component.less']
})
export class CodecComponent implements OnInit {
    contact: CodecContact;

    isMultimessageCall: boolean;
    codecData: Call;

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
        if (codecData instanceof Array) {
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
                this.codecData = codecData[numberOfCall];
                lastSeenCodecEntry.numberOfCall = numberOfCall;
                this.userService.setLastSeenCodecEntry(lastSeenCodecEntry, this.contact.name);
            } else {
                this.codecData = codecData[0];
                this.userService.setLastSeenCodecEntry(lastSeenCodecEntry, this.contact.name);
            }
        }
        if (codecData instanceof MultiMessageCall) {
            this.isMultimessageCall = true;
            this.codecData = codecData.messages[0];
        }
    }

    handleMainButtonClick() {
        
    }

    handleAltButtonClick() {

    }

    handleEndCall() {
        this.router.navigate(['/codec']);
    }
}
