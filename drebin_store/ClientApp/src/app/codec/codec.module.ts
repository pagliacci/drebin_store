import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodecRoutingModule } from './codec-routing.module';
import { CodecHomeComponent } from './codec-home/codec-home.component';
import { CodecComponent } from './codec/codec.component';
import { SignalIndicatorComponent } from './codec/signal-indicator/signal-indicator.component';
import { BriefingComponent } from './briefing/briefing.component';
import { CodecHeaderComponent } from './codec-header/codec-header.component';

@NgModule({
  declarations: [
    CodecHomeComponent,
    CodecComponent,
    SignalIndicatorComponent,
    BriefingComponent,
    CodecHeaderComponent
  ],
  imports: [
    CommonModule,
    CodecRoutingModule
  ]
})
export class CodecModule { }
