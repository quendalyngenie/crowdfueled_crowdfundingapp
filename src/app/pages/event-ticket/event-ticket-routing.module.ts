import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventTicketPage } from './event-ticket.page';

const routes: Routes = [
  {
    path: '',
    component: EventTicketPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventTicketPageRoutingModule {}
