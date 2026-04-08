import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.page.html',
  styleUrls: ['./transaction-history.page.scss'],
})
export class TransactionHistoryPage implements OnInit {
  transactions: any[] = [];
  userId: string;

  constructor() { }

  ngOnInit() {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      this.userId = currentUser.uid;
      this.fetchTransactions();
    }
  }

  fetchTransactions() {
    firebase.firestore().collection("Paypal")
      .where("userId", "==", this.userId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let transaction = doc.data();
          transaction.date = transaction.date.toDate();
          this.transactions.push(transaction);
        });
      })
      .catch((error) => {
        console.error("Error fetching transactions: ", error);
      });
  }

  
}
