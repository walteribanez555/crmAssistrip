
import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



import { PipesModule } from './pipes/pipes.module';

import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ServicesModule } from './services/services.module';
import { HomeComponent } from './components/home/home.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { HelpComponent } from './components/help/help.component';
import { CotizarComponent } from './components/cotizar/cotizar.component';
import { DatosPolizasComponent } from './components/datos-polizas/datos-polizas.component';





const routes : Routes = [
  
  {
    path: '**',
    redirectTo : 'main',
    pathMatch: 'full',
  },
  {
    path: '',
    redirectTo : 'home',
    pathMatch: 'full',
  },
  
  {
    path: '',
    component: LandingPageComponent,
    children : [
      {
        path : 'home',
        component : HomeComponent,
      },
      {
        path : 'about-us',
        component : AboutUsComponent

      },
      {
        path:'help',
        component : HelpComponent

      },
      {
        path: 'cotizar',
        component: CotizarComponent,
        
        
      },
      {
        path: 'datos-polizas',
        component : DatosPolizasComponent
      }
      
    ]
  },
  {
    path:'dashboard',
    redirectTo: 'dashboard/planes/listado-planes',
    pathMatch: 'full',
  },

  {
    path: 'dashboard',
    component:  DashboardComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./Modules/polizas/polizas.module').then(m => m.PolizasModule)
      },
      {
        path: '',
        loadChildren: () => import('./Modules/sitio-web/sitio-web-routes.module').then(m => m.SitioWebRoutingModule)
      },
      {
        path: '',
        loadChildren: () => import('./Modules/usuarios/usuarios.module').then(m => m.UsuariosModule)
      },
      {
        path: '',
        loadChildren : () => import('./Modules/planes/planes.module').then(m => m.PlanesModule)
      },
      {
        path: '',
        loadChildren : () => import('./Modules/cupones/cupones.module').then(m => m.CuponesModule)
      },
      {
        path : '',
        loadChildren : ()=> import('./Modules/camp-descuentos/camp-descuentos.module').then(m => m.CampDescuentosModule)
      }
      
    ]
    
  },
  
  
  


]

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ServicesModule,
    PipesModule,
    
    
    
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
