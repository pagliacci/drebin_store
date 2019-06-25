import { Component, OnInit, ChangeDetectionStrategy, HostBinding, AfterViewInit } from '@angular/core';
import { CodecService } from '../codec.service';
import { CodecContact } from '../models/codec-contact';

@Component({
  selector: 'app-codec-home',
  templateUrl: './codec-home.component.html',
  styleUrls: ['./codec-home.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodecHomeComponent {

  availableContacts: CodecContact[];

  constructor(codecService: CodecService) {
    this.availableContacts = codecService.getAvailableContacts();
    this.isNotWorking = this.availableContacts.length === 0;
  }

  @HostBinding('class.not-working') isNotWorking = false;
}
