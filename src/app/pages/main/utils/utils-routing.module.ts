import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UtilsComponent } from './pages';

const routes: Routes = [{ path: '', component: UtilsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtilsRoutingModule {
  static components = [UtilsComponent];
}
