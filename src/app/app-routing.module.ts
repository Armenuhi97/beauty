import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@guards/index';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/auth/sign-in' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/main/main.module').then((m) => m.MainModule),
  },
  { path: 'master', loadChildren: () => import('./pages/main/master/master.module').then(m => m.MasterModule) },
  { path: 'utils', loadChildren: () => import('./pages/main/utils/utils.module').then(m => m.UtilsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
