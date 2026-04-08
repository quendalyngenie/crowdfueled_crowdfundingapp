import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseCampaignService } from 'src/app/services/services/services/firebase-campaign.service';
import { FirebaseTransactionService } from 'src/app/services/services/services/firebase-transaction.service';


@Component({
  selector: 'app-campaign-detail',
  templateUrl: './campaign-detail.page.html',
  styleUrls: ['./campaign-detail.page.scss']
})
export class CampaignDetailPage implements OnInit {
  campaignId: string;
  campaign: any;
  imageUrl: string;

  constructor(
    private campaignService: FirebaseCampaignService,
    private transactionService: FirebaseTransactionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.campaignId = this.route.snapshot.paramMap.get('id');
    this.campaignService.getCampaign(this.campaignId).subscribe(campaign => {
      this.campaign = campaign;
      this.campaignService.getImageUrl(campaign.image).then(url => this.imageUrl = url);
    });
  }

  goToPayment(price: number) {
    this.campaignService.getCampaign(this.campaignId).subscribe(campaign => {
      if (campaign.slots > 0) {
        campaign.slots--;
        this.campaignService.updateCampaign(this.campaignId, campaign);
        const transaction = {
          campaign: campaign.name,
          price: price,
          date: new Date()
        };

        this.transactionService.addTransaction(transaction);
        this.router.navigate(['/campaign-paypal'], { queryParams: { price: price } });
      } else {
        console.log("The campaign is no longer available");
        // Add a message to the user that the campaign is no longer available
      }
    });
  }
}