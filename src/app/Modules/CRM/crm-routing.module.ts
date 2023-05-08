import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component : DashboardComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/polizas/polizas.module').then(m => m.PolizasModule)
      },
      {
        path: '',
        loadChildren: () => import('./modules/sitio-web/sitio-web-routes.module').then(m => m.SitioWebRoutingModule)
      },
      {
        path: '',
        loadChildren: () => import('./modules/usuarios/usuarios.module').then(m => m.UsuariosModule)
      },
      {
        path: '',
        loadChildren : () => import('./modules/planes/planes.module').then(m => m.PlanesModule)
      },
      {
        path: '',
        loadChildren : () => import('./modules/cupones/cupones.module').then(m => m.CuponesModule)
      },
      {
        path : '',
        loadChildren : ()=> import('./modules/camp-descuentos/camp-descuentos.module').then(m => m.CampDescuentosModule)
      }
    ]
  }

 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrmRoutingModule { }
