import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditemployeePage } from './editemployee.page';

const routes: Routes = [
  {
    path: '',
    component: EditemployeePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditemployeePageRoutingModule {}
