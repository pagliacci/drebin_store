import { Component, OnInit } from '@angular/core';
import { CodecContacts } from '../codec-contacts';

@Component({
  selector: 'app-codec-home',
  templateUrl: './codec-home.component.html',
  styleUrls: ['./codec-home.component.less']
})
export class CodecHomeComponent implements OnInit {

  availableContacts = CodecContacts.list;

  constructor() { }

  ngOnInit() {
  }

}
