import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventFavoritePage } from './event-favorite.page';

const routes: Routes = [
  {
    path: '',
    component: EventFavoritePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventFavoritePageRoutingModule { }
