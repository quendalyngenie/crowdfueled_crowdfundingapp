import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FavoriteEventService } from 'src/app/services/services/services/favorite-event.service';
import { FirebaseEventService } from 'src/app/services/services/services/firebase-event.service';

@Component({
  selector: 'app-event-favorite',
  templateUrl: './event-favorite.page.html',
  styleUrls: ['./event-favorite.page.scss']
})
export class EventFavoritePage implements OnInit {
  favoriteEvents: any[];

  constructor(private favoriteService: FavoriteEventService, private eventService: FirebaseEventService, private navCtrl: NavController) {
    this.favoriteEvents = [];
   }

  ngOnInit() {
    this.getFavoriteEvents();
  }

  getFavoriteEvents() {
    this.eventService.getEvents().subscribe(events => {
        this.favoriteEvents = events.filter(event => event.favorites === true);
    });
}


  goToEventDetail(eventId: string) {
    this.navCtrl.navigateForward(`/event-detail/${eventId}`);
  }
}