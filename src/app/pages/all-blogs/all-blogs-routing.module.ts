import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllBlogsPage } from './all-blogs.page';

const routes: Routes = [
  {
    path: '',
    component: AllBlogsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllBlogsPageRoutingModule {}
