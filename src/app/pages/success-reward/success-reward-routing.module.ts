import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuccessRewardPage } from './success-reward.page';

const routes: Routes = [
  {
    path: '',
    component: SuccessRewardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuccessRewardPageRoutingModule {}
