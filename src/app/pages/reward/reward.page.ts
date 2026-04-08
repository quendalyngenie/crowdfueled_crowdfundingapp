import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProjectService } from 'src/app/services/services/shankari_services/project_service/project.service';
import { Reward } from 'src/app/services/services/shankari_services/reward';

@Component({
  selector: 'app-reward',
  templateUrl: './reward.page.html',
  styleUrls: ['./reward.page.scss'],
})
export class RewardPage implements OnInit {
  rewardForm: FormGroup;
  prjId: string;

  constructor(private route: ActivatedRoute, private projectService: ProjectService, private router: Router) {
    this.prjId = this.route.snapshot.params.id

    this.rewardForm = new FormGroup({
      rewardName: new FormControl(''),
      details: new FormControl(''),
      price: new FormControl(''),
      delDate: new FormControl('')
    })
   }

  ngOnInit() {
  }

  createReward(){
    const prj = new Reward(
      this.rewardForm.value.rewardName,
      this.rewardForm.value.details,
      this.rewardForm.value.price,
      this.prjId,
      this.rewardForm.value.delDate,
    )
    this.projectService.createReward(prj);
    this.router.navigate(['/project-listing']);
  }

}
