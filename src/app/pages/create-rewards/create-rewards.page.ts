import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/services/services/shankari_services/project_service/project.service';
import { Reward } from 'src/app/services/services/shankari_services/reward';


@Component({
  selector: 'app-create-rewards',
  templateUrl: './create-rewards.page.html',
  styleUrls: ['./create-rewards.page.scss'],
})
export class CreateRewardsPage implements OnInit {
  rewardsForm: FormGroup; 
  prjId: string;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, 
              private projectService: ProjectService, private router: Router) {
    this.prjId = this.route.snapshot.params.id;

    this.rewardsForm = this.formBuilder.group({
      rewards: this.formBuilder.array([])
    })
   }

  ngOnInit() {
  }

  rewards(): FormArray {
    return this.rewardsForm.get("rewards") as FormArray
  }

  newReward(): FormGroup{
    return this.formBuilder.group({
      rewardName: '',
      details: '',
      price: '',
      delDate: ''
    })
  }

  addRewards(){
    this.rewards().push(this.newReward());
  }

  removeReward(i: number){
    this.rewards().removeAt(i);
  }

  onSubmit() { 
    let rewardList = this.rewardsForm.value.rewards;
    for (let i = 0; i < rewardList.length; i++) {
      const rewardItem = new Reward(rewardList[i].rewardName,rewardList[i].details, rewardList[i].price,this.prjId,rewardList[i].delDate)
      this.projectService.createReward(rewardItem);
      // console.log(rewardList[i].rewardName)
    }
    this.router.navigate(['/project-listing']);

  }  


}
