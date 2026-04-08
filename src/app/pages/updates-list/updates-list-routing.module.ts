import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatesListPage } from './updates-list.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatesListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatesListPageRoutingModule {}
