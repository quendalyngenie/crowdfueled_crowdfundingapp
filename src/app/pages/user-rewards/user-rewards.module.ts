import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserRewardsPageRoutingModule } from './user-rewards-routing.module';

import { UserRewardsPage } from './user-rewards.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserRewardsPageRoutingModule
  ],
  declarations: [UserRewardsPage]
})
export class UserRewardsPageModule {}
