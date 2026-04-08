import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FirebaseCampaignService } from 'src/app/services/services/services/firebase-campaign.service';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ChatService } from 'src/app/services/chat/chat.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.page.html',
  styleUrls: ['./campaign.page.scss']
})

export class CampaignPage {
  campaigns: any;
  campaignImages: { [key: string]: string } = {};
  filteredCampaigns: any;
  totalTransactions: number = 0;
  selectedFilter = 'nothing';

  userId: string;
  type: string;
  constructor(private authService: AuthService, private campaignService: FirebaseCampaignService, private navCtrl: NavController, private chatService: ChatService, private router: Router) {

    // this.campaignService.getCampaigns().subscribe(campaigns => {
    //   this.campaigns = campaigns;
    //   this.filteredCampaigns = campaigns;
    //   campaigns.forEach(campaign => {
    //     this.campaignService.getImageUrl(campaign.image).then(url => this.campaignImages[campaign.id] = url);
    //   });
    // });
    this.userId = this.authService.getId();
    this.authService.getSUTById(this.userId)
      .then(data => {
        this.type = data;
      })

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


  ngOnInit() {
    this.campaignService.getCampaigns().subscribe(campaigns => {
      this.campaigns = campaigns;
      this.filteredCampaigns = campaigns;
      campaigns.forEach(campaign => {
        this.campaignService.getImageUrl(campaign.image).then(url => this.campaignImages[campaign.id] = url);
        this.calculateProgress(campaign);
      });
    });
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


  // if txnAmt is number
  // calculateProgress(campaign) {
  //   let totalTransactions = 0;
  //   firebase.firestore().collection("Transaction").where("prjId", "==", campaign.id).get().then(querySnapshot => {
  //     querySnapshot.forEach(doc => {
  //       totalTransactions += doc.data().txnAmt;
  //     });

  //     // Calculate progress percentage
  //     campaign.progress = Math.floor(totalTransactions / campaign.target * 100);
  //     campaign.totalTransactions = totalTransactions;
  //   });
  // }


  goToCampaignDetail(campaignId: string) {
    this.navCtrl.navigateForward(`/campaign-detail/${campaignId}`);
  }

  favoriteCampaign(campaignId: string) {
    this.campaignService.getCampaign(campaignId).subscribe(campaign => {
      const updatedCampaign = { ...campaign, favorites: !campaign.favorites };
      this.campaignService.updateCampaign(campaignId, updatedCampaign);
      // Update the campaign object and the campaigns array directly
      const index = this.campaigns.findIndex(c => c.id === campaignId);
      this.campaigns[index].favorites = !this.campaigns[index].favorites;
    });

  }
  applyFilter() {
    switch (this.selectedFilter) {
      case 'nothing':
        this.filteredCampaigns.sort((a, b) => (a.endDate > b.endDate) ? 1 : -1);
        break;
      case 'latest':
        this.filteredCampaigns.sort((a, b) => (a.endDate < b.endDate) ? 1 : -1);
        break;
      case 'earliest':
        this.filteredCampaigns.sort((a, b) => (a.endDate > b.endDate) ? 1 : -1);
        break;
      case 'mostProgress':
        this.filteredCampaigns.sort((a, b) => (a.progress < b.progress) ? 1 : -1);
        break;
      case 'leastProgress':
        this.filteredCampaigns.sort((a, b) => (a.progress > b.progress) ? 1 : -1);
        break;
    }
  }

  resetFilter() {
    this.selectedFilter = 'nothing';
    this.filteredCampaigns = this.campaigns;
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