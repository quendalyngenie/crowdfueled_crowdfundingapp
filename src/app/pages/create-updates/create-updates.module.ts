import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateUpdatesPageRoutingModule } from './create-updates-routing.module';

import { CreateUpdatesPage } from './create-updates.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreateUpdatesPageRoutingModule
  ],
  declarations: [CreateUpdatesPage]
})
export class CreateUpdatesPageModule {}
