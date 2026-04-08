import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserRewardsPage } from './user-rewards.page';

const routes: Routes = [
  {
    path: '',
    component: UserRewardsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRewardsPageRoutingModule {}
