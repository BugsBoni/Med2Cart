import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CorPage } from './cor.page';

const routes: Routes = [
  {
    path: '',
    component: CorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CorPageRoutingModule {}
