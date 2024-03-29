import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CodecHomeComponent } from './codec-home/codec-home.component';
import { CodecComponent } from './codec/codec.component';
import { AuthGuard } from '../guards/auth.guard';
import { BriefingComponent } from './briefing/briefing.component';
import { BriefingGuard } from './guards/briefing.guard';

const codecRoutes: Routes = [
  {
    path: 'codec',
    component: CodecHomeComponent,
    canActivate: [AuthGuard, BriefingGuard]
  },
  {
    path: 'codec/:frequency',
    component: CodecComponent,
    canActivate: [AuthGuard, BriefingGuard]
  },
  {
    path: 'briefing',
    component: BriefingComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(codecRoutes)],
  exports: [RouterModule]
})
export class CodecRoutingModule { }
