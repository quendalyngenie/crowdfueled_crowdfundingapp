import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as L from 'leaflet';
import { FirebaseTransactionService } from 'src/app/services/services/services/firebase-transaction.service';
import { FirebaseEventService } from 'src/app/services/services/services/firebase-event.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss']
})
export class EventDetailPage implements OnInit {
  eventId: string;
  event: any;
  imageUrl: string;
  map: any;

  constructor(
    private eventService: FirebaseEventService,
    private transactionService: FirebaseTransactionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.eventService.getEvent(this.eventId).subscribe(event => {
      this.event = event;
      this.eventService.getImageUrl(event.image).then(url => this.imageUrl = url);
    });
  }

  ionViewDidEnter() {
    this.initMap();
  }

  initMap() {
    this.map = L.map('map').setView([this.event.geopoint_location.latitude, this.event.geopoint_location.longitude], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    const marker = L.marker([this.event.geopoint_location.latitude, this.event.geopoint_location.longitude]).addTo(this.map);
    marker.bindPopup(this.event.location).openPopup();
  }

  goToPayment(price: number) {
    this.eventService.getEvent(this.eventId).subscribe(event => {
      if (event.slots > 0) {
        event.slots--;
        this.eventService.updateEvent(this.eventId, event);
        const transaction = {
          event: event.name,
          price: price,
          date: new Date()
        };

        this.transactionService.addTransaction(transaction);
        this.router.navigate(['/event-paypal'], { queryParams: { price: price } });
      } else {
        console.log("The event is no longer available");
        // Add a message to the user that the event is no longer available
      }
    });
  }
}
