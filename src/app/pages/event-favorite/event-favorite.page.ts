import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FirebaseEventService } from 'src/app/services/services/services/firebase-event.service';

@Component({
  selector: 'app-event-favorite',
  templateUrl: './event-favorite.page.html',
  styleUrls: ['./event-favorite.page.scss']
})
export class EventFavoritePage implements OnInit {
  favoriteEvents: any[];
  events: any;
  eventImages: { [key: string]: string } = {};
  filteredEvents: any;

  constructor(private eventService: FirebaseEventService, private navCtrl: NavController) {
    this.favoriteEvents = [];
    this.eventService.getEvents().subscribe(events => {
      this.events = events;
      this.filteredEvents = events;
      events.forEach(event => {
        this.eventService.getImageUrl(event.image).then(url => this.eventImages[event.id] = url);
      });
    });
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

  search(event) {
    // Get the text typed by the user in the search bar
    const text = event.target.value;

    if (text && text.trim() !== '') {
      // Use all events to filter
      this.filteredEvents = this.events.filter(
        event => event.name.toLowerCase().includes(text.toLowerCase()));
    } else {
      // Blank text, clear the search, show all events
      this.filteredEvents = this.events;
    }
  }

}