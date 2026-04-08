import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RewardNotification } from 'src/app/services/services/shankari_services/notification';
import { NotificationService } from 'src/app/services/services/shankari_services/notification/notification.service';
import { ProjectService } from 'src/app/services/services/shankari_services/project_service/project.service';

@Component({
  selector: 'app-user-rewards',
  templateUrl: './user-rewards.page.html',
  styleUrls: ['./user-rewards.page.scss'],
})
export class UserRewardsPage implements OnInit {
  rewards:RewardNotification[]
  userID : string

  constructor(private notifiService: NotificationService, private authService: AuthService, 
              private projectService: ProjectService, private router: Router) {
    this.userID = this.authService.getId();
    // this.rewards = new RewardNotification("","",true,"")
    
    this.notifiService.getbyUserID(this.userID)
      .subscribe(data => {
        this.rewards = data;
        console.log(this.rewards)
      })
   }

  ngOnInit() {
  }

  rewardDetail(each){
    this.notifiService.Update(each)
    if(each.claimed == "notValid"){
      this.router.navigate(['/failed-reward/'+each.notId])
    }
    else{
    this.router.navigate(['/success-reward/'+each.notId])
    }
  }
}
