import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventPageRoutingModule } from './event-routing.module';

import { EventPage } from './event.page';
import { FirebaseEventService } from 'src/app/services/services/services/firebase-event.service';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventPageRoutingModule
  ],
  declarations: [EventPage],
  providers: [FirebaseEventService]
})
export class EventPageModule {}
