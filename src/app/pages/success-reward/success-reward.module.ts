import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuccessRewardPageRoutingModule } from './success-reward-routing.module';

import { SuccessRewardPage } from './success-reward.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuccessRewardPageRoutingModule
  ],
  declarations: [SuccessRewardPage]
})
export class SuccessRewardPageModule {}
