import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components';

const routes: Routes = [
    { path: '', redirectTo: '/auth/sign-in', pathMatch: 'full' },
    { path: 'sign-in', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
