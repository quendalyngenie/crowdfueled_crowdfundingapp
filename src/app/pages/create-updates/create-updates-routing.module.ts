import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateUpdatesPage } from './create-updates.page';

const routes: Routes = [
  {
    path: '',
    component: CreateUpdatesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateUpdatesPageRoutingModule {}
