import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonalblogPage } from './personalblog.page';

const routes: Routes = [
  {
    path: '',
    component: PersonalblogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalblogPageRoutingModule {}
