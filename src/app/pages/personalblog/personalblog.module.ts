import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonalblogPageRoutingModule } from './personalblog-routing.module';

import { PersonalblogPage } from './personalblog.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonalblogPageRoutingModule
  ],
  declarations: [PersonalblogPage]
})
export class PersonalblogPageModule {}
