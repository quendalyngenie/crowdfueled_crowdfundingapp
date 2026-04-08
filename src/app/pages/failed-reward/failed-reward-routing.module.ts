import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FailedRewardPage } from './failed-reward.page';

const routes: Routes = [
  {
    path: '',
    component: FailedRewardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FailedRewardPageRoutingModule {}
