import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventPaypalPage } from './event-paypal.page';

const routes: Routes = [
  {
    path: '',
    component: EventPaypalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventPaypalPageRoutingModule {}
