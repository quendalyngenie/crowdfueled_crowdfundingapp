import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventTicketPageRoutingModule } from './event-ticket-routing.module';

import { EventTicketPage } from './event-ticket.page';
import { FirebaseEventService } from 'src/app/services/services/services/firebase-event.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventTicketPageRoutingModule
  ],
  declarations: [EventTicketPage],
  providers: [FirebaseEventService]
})
export class EventTicketPageModule {}
