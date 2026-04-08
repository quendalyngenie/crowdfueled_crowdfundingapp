import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProjectListingPageRoutingModule } from './project-listing-routing.module';

import { ProjectListingPage } from './project-listing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProjectListingPageRoutingModule
  ],
  declarations: [ProjectListingPage]
})
export class ProjectListingPageModule {}
