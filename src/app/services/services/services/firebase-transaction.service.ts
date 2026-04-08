import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseTransactionService {
  transactionCollection = firebase.firestore().collection('Paypal');

  constructor() {}

  addTransaction(transaction: any) {
    return this.transactionCollection.add(transaction);
  }
}
