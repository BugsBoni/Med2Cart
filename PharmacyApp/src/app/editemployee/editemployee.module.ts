import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditemployeePageRoutingModule } from './editemployee-routing.module';

import { EditemployeePage } from './editemployee.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditemployeePageRoutingModule
  ],
  declarations: [EditemployeePage]
})
export class EditemployeePageModule {}
