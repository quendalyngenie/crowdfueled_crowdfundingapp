import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/services/services/shankari_services/project_service/project.service';
import { Reward } from 'src/app/services/services/shankari_services/reward';

@Component({
  selector: 'app-rewards-list',
  templateUrl: './rewards-list.page.html',
  styleUrls: ['./rewards-list.page.scss'],
})
export class RewardsListPage implements OnInit {
  rewards: Reward[]
  prjId: string

  constructor(private projectService:ProjectService, private route: ActivatedRoute) {
    this.prjId = this.route.snapshot.params.id

    this.projectService.getRewards(this.prjId)
      .subscribe(data => {
        this.rewards = data
        // console.log(data)
      })
   }

  ngOnInit() {
  }

}
