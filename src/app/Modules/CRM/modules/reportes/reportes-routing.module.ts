import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent, VentasComponent, SiniestrosComponent } from './pages';


const routes: Routes = [

  {
    path: 'reportes',
    component : LayoutPageComponent,
    children: [
      {
        path : 'ventas',
        component : VentasComponent,
      },
      {
        path : 'siniestros',
        component : SiniestrosComponent,
      }
    ]

  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesRoutingModule { }
