import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FirebaseEventService } from 'src/app/services/services/services/firebase-event.service';
import { AuthService } from 'src/app/services/auth/auth.service';



@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss']
})

export class EventPage {
  events: any;
  eventImages: { [key: string]: string } = {};
  filteredEvents: any;
  // userId: string;
  // type: string;
  selectedFilter: string = 'nothing';

  constructor(private eventService: FirebaseEventService, private navCtrl: NavController, private authService: AuthService) {
    // this.userId = this.authService.getId();
    // this.authService.getSUTById(this.userId)
    //   .then(data => {
    //     this.type = data;
    //   })
    this.eventService.getEvents().subscribe(events => {
      this.events = events;
      this.filteredEvents = events;
      events.forEach(event => {
        this.eventService.getImageUrl(event.image).then(url => this.eventImages[event.id] = url);
      });
    });
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


  ngOnInit() {
  }

  goToEventDetail(eventId: string) {
    this.navCtrl.navigateForward(`/event-detail/${eventId}`);
  }

  favoriteEvent(eventId: string) {
    this.eventService.getEvent(eventId).subscribe(event => {
      const updatedEvent = { ...event, favorites: !event.favorites };
      this.eventService.updateEvent(eventId, updatedEvent);
      //  Update the event object and the events array directly
      event.favorites = !event.favorites;
      const index = this.events.findIndex(c => c.id === eventId);
      this.events[index] = event;
    });
  }

  applyFilter() {
    switch (this.selectedFilter) {
      case 'nothing':
        this.filteredEvents.sort((a, b) => (a.date < b.date) ? 1 : -1);
        break;
      case 'latest':
        this.filteredEvents.sort((a, b) => (a.date < b.date) ? 1 : -1);
        break;
      case 'earliest':
        this.filteredEvents.sort((a, b) => (a.date > b.date) ? 1 : -1);
        break;
      case 'most-expensive-adult':
        this.filteredEvents.sort((a, b) => (a.price_adult < b.price_adult) ? 1 : -1);
        break;
      case 'cheapest-adult':
        this.filteredEvents.sort((a, b) => (a.price_adult > b.price_adult) ? 1 : -1);
        break;
      case 'most-expensive-student':
        this.filteredEvents.sort((a, b) => (a.price_student < b.price_student) ? 1 : -1);
        break;
      case 'cheapest-student':
        this.filteredEvents.sort((a, b) => (a.price_student > b.price_student) ? 1 : -1);
        break;
      case 'most-slots':
        this.filteredEvents.sort((a, b) => (a.slots < b.slots) ? 1 : -1);
        break;
      case 'least-slots':
        this.filteredEvents.sort((a, b) => (a.slots > b.slots) ? 1 : -1);
        break;
    }
  }

  // add this method to reset the filter
  resetFilter() {
    this.selectedFilter = 'nothing';
    this.filteredEvents = this.events;
  }
}