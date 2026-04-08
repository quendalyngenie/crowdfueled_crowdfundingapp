import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseTransactionService } from 'src/app/services/services/services/firebase-transaction.service';
import { FirebaseEventService } from 'src/app/services/services/services/firebase-event.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-event-ticket',
  templateUrl: './event-ticket.page.html',
  styleUrls: ['./event-ticket.page.scss'],
})
export class EventTicketPage implements OnInit {
  eventId: string;
  event: any;
  events: any;
  adultTickets = 0;
  studentTickets = 0;
  total = 0;

  constructor(
    private eventService: FirebaseEventService,
    private transactionService: FirebaseTransactionService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.eventService.getEvents().subscribe(events => {
      this.events = events;});
  }

  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.eventService.getEvent(this.eventId).subscribe(event => {
      this.event = event;
    });
  }
  
  

  incrementAdult() {
    this.adultTickets++;
    this.total += this.event.price_adult;
  }
  
  decrementAdult() {
    if (this.adultTickets > 0) {
      this.adultTickets--;
      this.total -= this.event.price_adult;
    }
  }
  
  incrementStudent() {
    this.studentTickets++;
    this.total += this.event.price_student;
  }
  
  decrementStudent() {
    if (this.studentTickets > 0) {
      this.studentTickets--;
      this.total -= this.event.price_student;
    }
  }
  
  getTotalTickets() {
    return this.adultTickets + this.studentTickets;
  }
  
  bookTickets() {
    this.eventService.getEvent(this.eventId).subscribe(event => {
      const totalTickets = this.getTotalTickets();
      if (event.slots >= totalTickets) {
        event.slots -= totalTickets;
        this.eventService.updateEvent(this.eventId, event);
        const transaction = {
          userId: this.authService.getId(),
          eventId: this.eventId,
          event: event.name,
          price: this.total,
          date: new Date(),
          adultTickets: this.adultTickets, // add adultTickets to transaction
          studentTickets: this.studentTickets, // add studentTickets to transaction
          tickets: totalTickets
        };
  
        this.transactionService.addTransaction(transaction);
        this.router.navigate(['/event-paypal'], { queryParams: { price: this.total } });
      } else {
        console.log("The event is no longer available");
        // Add a message to the user that the event is no longer available
      }
    });
  }
  
  
}
