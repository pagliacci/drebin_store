import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodecRoutingModule } from './codec-routing.module';
import { CodecHomeComponent } from './codec-home/codec-home.component';
import { CodecComponent } from './codec/codec.component';

@NgModule({
  declarations: [
    CodecHomeComponent,
    CodecComponent
  ],
  imports: [
    CommonModule,
    CodecRoutingModule
  ]
})
export class CodecModule { }
