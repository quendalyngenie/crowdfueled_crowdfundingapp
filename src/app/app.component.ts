import { Component } from '@angular/core';
import firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyDqgA3Vm-bLGfYeRTpRLBEt3ScFrHCSVYQ",
      authDomain: "bipj-95a09.firebaseapp.com",
      projectId: "bipj-95a09",
      storageBucket: "bipj-95a09.appspot.com",
      messagingSenderId: "757457805119",
      appId: "1:757457805119:web:bdff28b22b34c3b700fd8a",
      measurementId: "G-FLBG24FZ4W"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}
