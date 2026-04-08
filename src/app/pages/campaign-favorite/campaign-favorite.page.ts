import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FirebaseCampaignService } from 'src/app/services/services/services/firebase-campaign.service';
import firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-campaign-favorite',
  templateUrl: './campaign-favorite.page.html',
  styleUrls: ['./campaign-favorite.page.scss']
})
export class CampaignFavoritePage implements OnInit {
  favoriteCampaigns: any[];
  campaigns: any;
  campaignImages: { [key: string]: string } = {};
  filteredCampaigns: any;
  totalTransactions: number = 0;

  constructor(private campaignService: FirebaseCampaignService, private navCtrl: NavController) {
    this.favoriteCampaigns = [];
   }

  ngOnInit() {
    this.getFavoriteCampaigns();
    this.campaignService.getCampaigns().subscribe(campaigns => {
      this.campaigns = campaigns;
      this.filteredCampaigns = campaigns;
      campaigns.forEach(campaign => {
        this.campaignService.getImageUrl(campaign.image).then(url => this.campaignImages[campaign.id] = url);
        this.calculateProgress(campaign);
      });
    });
  }

  getFavoriteCampaigns() {
    this.campaignService.getCampaigns().subscribe(campaigns => {
        this.favoriteCampaigns = campaigns.filter(campaign => campaign.favorites === true);
        this.favoriteCampaigns.forEach(campaign => {
          this.campaignService.getImageUrl(campaign.image).then(url => this.campaignImages[campaign.id] = url);
          this.calculateProgress(campaign);
        });
    });
}


  goToCampaignDetail(campaignId: string) {
    this.navCtrl.navigateForward(`/campaign-detail/${campaignId}`);
  }

  search(campaign) {
    // Get the text typed by the user in the search bar
    const text = campaign.target.value;

    if (text && text.trim() !== '') {
      // Use all campaigns to filter
      this.filteredCampaigns = this.campaigns.filter(
        campaign => campaign.prjName.toLowerCase().includes(text.toLowerCase()));
    } else {
      // Blank text, clear the search, show all campaigns
      this.filteredCampaigns = this.campaigns;
    }
  }

  calculateProgress(campaign) {
    let totalTransactions = 0;
    firebase.firestore().collection("Transaction").where("prjId", "==", campaign.id).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        totalTransactions += Number(doc.data().txnAmt); // convert string to number
      });
  
      // Calculate progress percentage
      campaign.progress = Math.floor(totalTransactions / campaign.target * 100);
      campaign.totalTransactions = totalTransactions;
    });
  }

}