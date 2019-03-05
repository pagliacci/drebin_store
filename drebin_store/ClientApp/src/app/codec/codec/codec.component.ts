import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CodecContact } from '../models/codec-contact';
import { CodecService } from '../codec.service';

@Component({
    selector: 'app-codec',
    templateUrl: './codec.component.html',
    styleUrls: ['./codec.component.less']
})
export class CodecComponent implements OnInit {
    contact: CodecContact;

    codecText: string;

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

        const currentUser = this.userService.currentUser;

        this.codecText = this.codecService.getCodectText(this.contact, currentUser.mainQuestStage);
    }
}
