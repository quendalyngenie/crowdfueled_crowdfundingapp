import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as JsBarCode from 'jsbarcode';
import { RewardNotification } from 'src/app/services/services/shankari_services/notification';
import { NotificationService } from 'src/app/services/services/shankari_services/notification/notification.service';


declare var generateBarCode;
@Component({
  selector: 'app-success-reward',
  templateUrl: './success-reward.page.html',
  styleUrls: ['./success-reward.page.scss'],
})
export class SuccessRewardPage implements OnInit {
  notiId: string
  rewardDetail: RewardNotification
  token: string;

  constructor(private route: ActivatedRoute, private notiService: NotificationService) {
    this.notiId = this.route.snapshot.params.id;
    this.rewardDetail = new RewardNotification("","","", false,"","","","", new Date)


    this.notiService.getNotById(this.notiId)
      .subscribe(data =>{
        this.rewardDetail = data;
        this.token = data.rewardToken;
        console.log(this.token);
        this.barCode(this.token)
      })


    
   }

  ngOnInit() {
    // JsBarCode("#tokenCode", "welp",{
    //   width: 1,
    //   height: 25
    // })
  }

  barCode(value){
    JsBarCode("#tokenCode", value,{
      width: 1,
      height: 25
    })
  }
 
  

  

}

