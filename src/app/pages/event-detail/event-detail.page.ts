import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import * as L from 'leaflet';
import { FirebaseEventService } from 'src/app/services/services/services/firebase-event.service';


@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss']
})
export class EventDetailPage implements OnInit {
  eventId: string;
  events: any;
  event: any;
  imageUrl: string;
  map: any;

  constructor(
    private eventService: FirebaseEventService,
    private route: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController,
  ) {
    this.eventService.getEvents().subscribe(events => {
      this.events = events;});
  }

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

  goToTicket(eventId: string){
    this.navCtrl.navigateForward(`/event-ticket/${eventId}`);
  }
  
  
  
  
  
}
