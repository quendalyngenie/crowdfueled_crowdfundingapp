import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditRewardsPageRoutingModule } from './edit-rewards-routing.module';

import { EditRewardsPage } from './edit-rewards.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditRewardsPageRoutingModule
  ],
  declarations: [EditRewardsPage]
})
export class EditRewardsPageModule {}
