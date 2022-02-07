import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CorPageRoutingModule } from './cor-routing.module';

import { CorPage } from './cor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CorPageRoutingModule
  ],
  declarations: [CorPage]
})
export class CorPageModule {}
