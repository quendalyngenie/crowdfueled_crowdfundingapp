import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RewardPageRoutingModule } from './reward-routing.module';

import { RewardPage } from './reward.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RewardPageRoutingModule
  ],
  declarations: [RewardPage]
})
export class RewardPageModule {}
