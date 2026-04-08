import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateRewardsPageRoutingModule } from './create-rewards-routing.module';

import { CreateRewardsPage } from './create-rewards.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreateRewardsPageRoutingModule
  ],
  declarations: [CreateRewardsPage]
})
export class CreateRewardsPageModule {}
