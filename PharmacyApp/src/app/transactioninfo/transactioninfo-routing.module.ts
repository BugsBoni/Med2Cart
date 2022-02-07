import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactioninfoPage } from './transactioninfo.page';

const routes: Routes = [
  {
    path: '',
    component: TransactioninfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactioninfoPageRoutingModule {}
