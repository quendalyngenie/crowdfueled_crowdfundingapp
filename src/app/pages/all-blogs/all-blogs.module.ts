import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllBlogsPageRoutingModule } from './all-blogs-routing.module';

import { AllBlogsPage } from './all-blogs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllBlogsPageRoutingModule
  ],
  declarations: [AllBlogsPage]
})
export class AllBlogsPageModule {}
