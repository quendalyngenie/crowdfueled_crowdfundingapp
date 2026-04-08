import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CampaignFavoritePageRoutingModule } from './campaign-favorite-routing.module';

import { CampaignFavoritePage } from './campaign-favorite.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CampaignFavoritePageRoutingModule
  ],
  declarations: [CampaignFavoritePage]
})
export class CampaignFavoritePageModule {}
