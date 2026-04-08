import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RewardsListPageRoutingModule } from './rewards-list-routing.module';

import { RewardsListPage } from './rewards-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RewardsListPageRoutingModule
  ],
  declarations: [RewardsListPage]
})
export class RewardsListPageModule {}
