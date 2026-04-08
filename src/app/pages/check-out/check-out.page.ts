import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/services/services/shankari_services/project';
import { Reward } from 'src/app/services/services/shankari_services/reward';
import { LoadingService } from 'src/app/services/services/shankari_services/loading/loading.service'


import { ProjectService } from 'src/app/services/services/shankari_services/project_service/project.service';
import { Transaction } from 'src/app/services/services/shankari_services/transaction';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import * as test from 'src/assets/Javascript/blockchain.js'

declare var createTxn
@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.page.html',
  styleUrls: ['./check-out.page.scss'],
})
export class CheckOutPage implements OnInit {
  project: Project;
  rewards: Reward[] = [];
  projectId: string;
  txnId: string;
  donationForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router,
    private projectService: ProjectService, private ionLoaderService: LoadingService, private authService: AuthService) {
    this.projectId = this.route.snapshot.params.id;
    // this.projectId = 'LTp5sg5pPMqPwbSWn1TF'
    this.project = new Project("", "", "", "", "", 0, new Date, new Date, "", "", "", "", "", 0);
    this.txnId = this.projectService.txnId;

    this.donationForm = new FormGroup({
      txnAmt: new FormControl('', [Validators.required])
    })

    this.projectService.getPrjById(this.projectId)
      .subscribe(data => {
        this.project = data;
        // console.log(this.project);
      })
    this.projectService.getRewards(this.projectId)
      .subscribe(data => {
        this.rewards = data;
        console.log(this.rewards);
      })



  }
  ngOnInit() {
  }

  // (click)="addTxn(txnId, projectId, each.rewqardId, each.price)"
  addTxn_Campign() {   //pass in reward
    this.ionLoaderService.simpleLoader()
    let amt = 0;
    let rewardlist = [];
    for (let i = 0; i < this.rewards.length; i++) {
      let itemName = this.rewards[i].rewqardId;
      const htmlId = document.getElementById(itemName) as HTMLInputElement | null;

      if (htmlId.checked) {
        amt += this.rewards[i].price;
        rewardlist.push(this.rewards[i].rewqardId)
      }
      console.log(htmlId.checked);
    }

    let userid = this.authService.getId() //Get current user;
    const txn = new Transaction(this.txnId, this.projectId, amt, userid, 'Campaign', 'pending', rewardlist.toString())
    // const txn = new Transaction(this.txnId, this.projectId,reward.price,userid,'Campaign',reward.rewqardId)
    var bcTransact = createTxn(txn)
    bcTransact.then(r => {
      this.projectService.newTxn_camp(txn);
      this.ionLoaderService.dismissLoader();
      this.router.navigate(['/campaign']);

    }).catch(error => {
      // txn.status = "error"
      // this.projectService.createPrj(prj);
      alert("Error is Metamask transaction");
      this.ionLoaderService.dismissLoader();
      this.router.navigate(['/campaign']);
    })
  }

  addTxn_Donation() {
    let userid = this.authService.getId() //Get current user
    const txnAmt = this.donationForm.value.txnAmt
    const txn = new Transaction(this.txnId, this.projectId, txnAmt, userid, 'Donation', 'pending')
    this.ionLoaderService.simpleLoader()
    var don = createTxn(txn)
    don.then(r => {
      this.projectService.newTxn_don(txn);
      this.ionLoaderService.dismissLoader()
      this.router.navigate(['/campaign'])
    }).catch(error => {
      alert("Error is Metamask transaction");
      this.ionLoaderService.dismissLoader()
      this.router.navigate(['/campaign'])
    })

  }
}

