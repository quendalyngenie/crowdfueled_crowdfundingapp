import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import { map, catchError } from 'rxjs/operators';
import { from, throwError } from 'rxjs';
import { Campaign } from '../services/campaign';

@Injectable({
  providedIn: 'root'
})
export class FirebaseCampaignService {
  getTransactionsForCampaign(campaignId: string) {
    throw new Error('Method not implemented.');
  }
  campaignsCollection = firebase.firestore().collection('Projects');

  constructor() { }

  getCampaigns() {
    return from(this.campaignsCollection.get()).pipe(
      map(snapshot => snapshot.docs.map(doc => {
        const data = doc.data() as any;
        const id = doc.id;
        return { id, ...data };
      }))
    );
  }

  getCampaign(campaignId: string) {
    return from(this.campaignsCollection.doc(campaignId).get()).pipe(
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

  updateCampaign(campaignId: string, campaign: Campaign) {
    return this.campaignsCollection.doc(campaignId).update(campaign);
  }


}