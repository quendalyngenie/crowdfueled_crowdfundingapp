import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpecificblogPageRoutingModule } from './specificblog-routing.module';

import { SpecificblogPage } from './specificblog.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpecificblogPageRoutingModule
  ],
  declarations: [SpecificblogPage]
})
export class SpecificblogPageModule {}
