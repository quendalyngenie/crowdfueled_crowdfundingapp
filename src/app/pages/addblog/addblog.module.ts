import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddblogPageRoutingModule } from './addblog-routing.module';

import { AddblogPage } from './addblog.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddblogPageRoutingModule
  ],
  declarations: [AddblogPage]
})
export class AddblogPageModule {}
