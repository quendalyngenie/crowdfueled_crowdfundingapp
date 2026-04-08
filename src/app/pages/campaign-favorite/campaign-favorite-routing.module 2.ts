import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CampaignFavoritePage } from './campaign-favorite.page';

const routes: Routes = [
  {
    path: '',
    component: CampaignFavoritePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CampaignFavoritePageRoutingModule {}
