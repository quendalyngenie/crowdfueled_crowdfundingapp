import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditProjectsPage } from './edit-projects.page';

const routes: Routes = [
  {
    path: '',
    component: EditProjectsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditProjectsPageRoutingModule {}
