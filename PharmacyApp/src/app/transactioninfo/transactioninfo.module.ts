import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactioninfoPageRoutingModule } from './transactioninfo-routing.module';

import { TransactioninfoPage } from './transactioninfo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactioninfoPageRoutingModule
  ],
  declarations: [TransactioninfoPage]
})
export class TransactioninfoPageModule {}
