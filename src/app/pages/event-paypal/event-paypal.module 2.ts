import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventPaypalPageRoutingModule } from './event-paypal-routing.module';

import { EventPaypalPage } from './event-paypal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventPaypalPageRoutingModule
  ],
  declarations: [EventPaypalPage]
})
export class EventPaypalPageModule {}
