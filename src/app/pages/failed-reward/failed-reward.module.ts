import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FailedRewardPageRoutingModule } from './failed-reward-routing.module';

import { FailedRewardPage } from './failed-reward.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FailedRewardPageRoutingModule
  ],
  declarations: [FailedRewardPage]
})
export class FailedRewardPageModule {}
