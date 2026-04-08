import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FavoriteCampaignService } from 'src/app/services/services/services/favorite-campaign.service';
import { FirebaseCampaignService } from 'src/app/services/services/services/firebase-campaign.service';


@Component({
  selector: 'app-campaign-favorite',
  templateUrl: './campaign-favorite.page.html',
  styleUrls: ['./campaign-favorite.page.scss']
})
export class CampaignFavoritePage implements OnInit {
  favoriteCampaigns: any[];

  constructor(private favoriteService: FavoriteCampaignService, private campaignService: FirebaseCampaignService, private navCtrl: NavController) {
    this.favoriteCampaigns = [];
   }

  ngOnInit() {
    this.getFavoriteCampaigns();
  }

  getFavoriteCampaigns() {
    this.campaignService.getCampaigns().subscribe(campaigns => {
        this.favoriteCampaigns = campaigns.filter(campaign => campaign.favorites === true);
    });
}


  goToCampaignDetail(campaignId: string) {
    this.navCtrl.navigateForward(`/campaign-detail/${campaignId}`);
  }
}