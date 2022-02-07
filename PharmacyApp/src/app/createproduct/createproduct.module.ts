import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateproductPageRoutingModule } from './createproduct-routing.module';

import { CreateproductPage } from './createproduct.page';
import { ReactiveFormsModule } from '@angular/forms';
import { FileSizeFormatPipe } from './file-size-format.pipe';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateproductPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CreateproductPage,FileSizeFormatPipe]
})
export class CreateproductPageModule {}
