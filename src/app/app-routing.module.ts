
import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isNotAuthenticatedGuard } from './Modules/auth/guards/is-not-authenticated.guard';
import { isAuthenticatedGuard } from './Modules/auth/guards';










const routes : Routes = [

  {
    path: '',
    redirectTo : 'auth/login',
    pathMatch : 'full'
  },


  {
    path: 'dashboard',
    redirectTo : 'dashboard/polizas/listado-polizas',
  },
  { path: 'dashboard',
    canActivate : [isAuthenticatedGuard],
    loadChildren: () => import('./Modules/CRM/crm.module').then(m => m.CrmModule) },



  { path: 'auth' ,
    canActivate : [ isNotAuthenticatedGuard ],
    loadChildren : () => import('./Modules/auth/auth.module').then(m => m.AuthModule) },


  {
    path : '**',
    redirectTo : 'auth/login',
  },




]

@NgModule({
  imports: [
    RouterModule.forRoot(routes),



  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
