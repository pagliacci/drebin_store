import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CodecContacts } from '../codec-contacts';
import { CodecService } from '../codec.service';

@Component({
  selector: 'app-codec-home',
  templateUrl: './codec-home.component.html',
  styleUrls: ['./codec-home.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodecHomeComponent {

  constructor(private codecService: CodecService) { }

  get availableContacts() {
    return this.codecService.getAvailableContacts();
  }
}
