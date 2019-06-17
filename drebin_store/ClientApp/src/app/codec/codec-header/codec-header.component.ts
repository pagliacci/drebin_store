import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { CodecContact } from '../models/codec-contact';

@Component({
  selector: 'app-codec-header',
  templateUrl: './codec-header.component.html',
  styleUrls: ['./codec-header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodecHeaderComponent {

  @Input()
  contact: CodecContact;

}
