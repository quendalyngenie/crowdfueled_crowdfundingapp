import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RewardNotification } from 'src/app/services/services/shankari_services/notification';
import { NotificationService } from 'src/app/services/services/shankari_services/notification/notification.service';

@Component({
  selector: 'app-failed-reward',
  templateUrl: './failed-reward.page.html',
  styleUrls: ['./failed-reward.page.scss'],
})
export class FailedRewardPage implements OnInit {
  notiId: string;
  rewardDetail: RewardNotification;

  constructor(private route: ActivatedRoute, private notiService: NotificationService) {
    this.notiId = this.route.snapshot.params.id
    this.rewardDetail = new RewardNotification("","","", false,"","")

    this.notiService.getNotById(this.notiId)
      .subscribe(data =>{
        this.rewardDetail = data
        // console.log(data);
      })
   }

  ngOnInit() {
  }

}
