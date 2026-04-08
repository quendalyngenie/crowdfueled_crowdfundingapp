import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ChatService } from 'src/app/services/chat/chat.service';
import { Project } from 'src/app/services/models/projects';
import { ProjectService } from 'src/app/services/services/shankari_services/project_service/project.service';

@Component({
  selector: 'app-project-listing',
  templateUrl: './project-listing.page.html',
  styleUrls: ['./project-listing.page.scss'],
})
export class ProjectListingPage implements OnInit {
  projects: Project[] = []
  userId: string;
  type: string;

  constructor(private projectService: ProjectService, private authService: AuthService, private chatService: ChatService, private router: Router) {
    // this.projects = new Project("","","","","",0,new Date,new Date,"","","","","");
    this.userId = this.authService.getId()
    console.log(this.userId)

    this.projectService.getPrjByUser(this.userId)
      .subscribe(data => {
        this.projects = data;
        console.log(data);
      })

    this.authService.getSUTById(this.userId)
      .then(data => {
        this.type = data;
      })

  }

  ngOnInit() {
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

}
