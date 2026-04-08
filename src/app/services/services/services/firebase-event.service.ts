import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import { map, catchError } from 'rxjs/operators';
import { from, throwError } from 'rxjs';
import { Event } from '../services/event';

@Injectable({
  providedIn: 'root'
})
export class FirebaseEventService {
  eventsCollection = firebase.firestore().collection('Events');

  constructor() {}

  getEvents() {
    return from(this.eventsCollection.get()).pipe(
      map(snapshot => snapshot.docs.map(doc => {
        const data = doc.data() as any;
        const id = doc.id;
        return { id, ...data };
      }))
    );
  }

  getEvent(eventId: string) {
    return from(this.eventsCollection.doc(eventId).get()).pipe(
      map(doc => {
        if (doc.exists) {
          const data = doc.data() as any;
          const id = doc.id;
          return { id, ...data };
        } else {
          console.log("No such document!");
          return null;
        }
      }),
      catchError(error => {
        console.log("Error getting document:", error);
        return throwError(error);
      })
    );
  }

  getImageUrl(imageName: string) {
    return firebase.storage().ref().child(imageName).getDownloadURL();
  }

  updateEvent(eventId: string, event: Event) {
    if (event.slots <= 0) {
      return this.deleteEvent(eventId);
    } else {
      return this.eventsCollection.doc(eventId).update(event);
    }
  }

  deleteEvent(eventId: string) {
    return this.eventsCollection.doc(eventId).delete();
  }
}