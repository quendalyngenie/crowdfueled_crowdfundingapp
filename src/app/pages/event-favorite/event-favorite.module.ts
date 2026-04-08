import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventFavoritePageRoutingModule } from './event-favorite-routing.module';

import { EventFavoritePage } from './event-favorite.page';
import { FirebaseEventService } from 'src/app/services/services/services/firebase-event.service';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventFavoritePageRoutingModule
  ],
  declarations: [EventFavoritePage],
  providers: [FirebaseEventService]
})
export class EventFavoritePageModule { }
