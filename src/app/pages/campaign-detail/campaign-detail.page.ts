import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseCampaignService } from 'src/app/services/services/services/firebase-campaign.service';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

@Component({
  selector: 'app-campaign-detail',
  templateUrl: './campaign-detail.page.html',
  styleUrls: ['./campaign-detail.page.scss']
})
export class CampaignDetailPage implements OnInit {
  campaignId: string;
  campaign: any;
  imageUrl: string;
  totalTransactions: number = 0;
  numContributors: number = 0;

  constructor(
    private campaignService: FirebaseCampaignService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.campaignId = this.route.snapshot.paramMap.get('id');
    this.campaignService.getCampaign(this.campaignId).subscribe(campaign => {
      this.campaign = campaign;
      this.campaignService.getImageUrl(campaign.image).then(url => this.imageUrl = url);
    });


    firebase.firestore().collection("Transaction").where("prjId", "==", this.campaignId).get().then(querySnapshot => {
      let userIds = new Set<string>();
      querySnapshot.forEach(doc => {
        const txnAmt = Number(doc.data().txnAmt);
        if (!isNaN(txnAmt)) {
          this.totalTransactions += txnAmt;
        }
        userIds.add(doc.data().userId);
      });
    
      this.campaign.progress = Math.floor(this.totalTransactions / this.campaign.target * 100);
      this.numContributors = userIds.size;
    });
  }
   
}

    
    // if txnAmt is Number
    // // Get total transaction amount for the campaign
    // firebase.firestore().collection("Transaction").where("prjId", "==", this.campaignId).get().then(querySnapshot => {
    //   let userIds = new Set<string>(); // Use a Set to keep track of unique user IDs
  
    //   querySnapshot.forEach(doc => {
    //     this.totalTransactions = this.totalTransactions + doc.data().txnAmt;
    //     userIds.add(doc.data().userId); // Add the user ID to the set
    //   });
  
    //   // Calculate progress percentage
    //   this.campaign.progress = Math.floor(this.totalTransactions / this.campaign.target * 100);
  
    //   // Set the number of unique users who have made transactions
    //   this.campaign.numContributors = userIds.size;
    // });
