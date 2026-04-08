import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditUpdatesPage } from './edit-updates.page';

const routes: Routes = [
  {
    path: '',
    component: EditUpdatesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditUpdatesPageRoutingModule {}
