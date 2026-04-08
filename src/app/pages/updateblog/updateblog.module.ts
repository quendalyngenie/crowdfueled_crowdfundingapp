import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateblogPageRoutingModule } from './updateblog-routing.module';

import { UpdateblogPage } from './updateblog.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    UpdateblogPageRoutingModule
  ],
  declarations: [UpdateblogPage]
})
export class UpdateblogPageModule {}
