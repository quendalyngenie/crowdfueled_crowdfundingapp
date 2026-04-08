import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase';
import 'firebase/auth';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Firestore } from '@angular/fire/firestore';
import { ChatService } from 'src/app/services/chat/chat.service';
@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  userId: string;
  name: string;
  email: string;
  type: string;
  dob: string;


  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService, private afs: Firestore, private chatService: ChatService) {
    this.userId = this.authService.getId();
    this.authService.getSpecificUserNameById(this.userId)
      .then(data => {
        this.name = data.toUpperCase();
      })

    this.authService.getSUEById(this.userId)
      .then(data => {
        this.email = data;
      })

    this.authService.getSUTById(this.userId)
      .then(data => {
        this.type = data;
      })

    this.authService.getSUDOBById(this.userId)
      .then(data => {
        this.dob = data;
      })
  }

  async logout() {
    try {
      await this.chatService.auth.logout();
      // this.chatService.currentUserId = null;
      this.router.navigateByUrl('/login', { replaceUrl: true });
    } catch (e) {
      console.log(e);
    }
  }

  ngOnInit() {
  }

}