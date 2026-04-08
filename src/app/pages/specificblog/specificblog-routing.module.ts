import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpecificblogPage } from './specificblog.page';

const routes: Routes = [
  {
    path: '',
    component: SpecificblogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpecificblogPageRoutingModule {}
