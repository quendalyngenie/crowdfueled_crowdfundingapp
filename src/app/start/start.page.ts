import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ChatService } from '../services/chat/chat.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {
  userId: string;
  type: string;

  constructor(private authService: AuthService, private chatService: ChatService, private router: Router) {
    this.userId = this.authService.getId();
    this.authService.getSUTById(this.userId)
      .then(data => {
        this.type = data;
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
