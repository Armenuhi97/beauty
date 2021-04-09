import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterDetailsComponent } from './pages/master-details/master-details.component';

import { MasterComponent } from './pages/master/master.component';

const routes: Routes = [
  { path: '', component: MasterComponent },
  { path: ':id', component: MasterDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule {
}
