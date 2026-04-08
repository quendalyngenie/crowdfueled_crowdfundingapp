import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditUpdatesPageRoutingModule } from './edit-updates-routing.module';

import { EditUpdatesPage } from './edit-updates.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditUpdatesPageRoutingModule
  ],
  declarations: [EditUpdatesPage]
})
export class EditUpdatesPageModule {}
