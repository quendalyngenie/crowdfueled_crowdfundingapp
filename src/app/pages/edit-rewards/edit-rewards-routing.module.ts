import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditRewardsPage } from './edit-rewards.page';

const routes: Routes = [
  {
    path: '',
    component: EditRewardsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditRewardsPageRoutingModule {}
