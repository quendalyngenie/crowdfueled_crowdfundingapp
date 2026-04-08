import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatesListPageRoutingModule } from './updates-list-routing.module';

import { UpdatesListPage } from './updates-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdatesListPageRoutingModule
  ],
  declarations: [UpdatesListPage]
})
export class UpdatesListPageModule {}
