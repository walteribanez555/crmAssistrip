import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { ReembolsoComponent } from './pages/reembolso/reembolso.component';
import { EditComponent } from './pages/edit/edit.component';

const routes: Routes = [
  {
    path : 'reembolso',
    component : LayoutPageComponent,
    children : [
      {
        path : 'listado-reembolso',
        component : ListadoComponent,
      },
      {
        path : ':id',
        component : ReembolsoComponent,
      },
      {
        path : ':id/edit',
        component : EditComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReembolsosRoutingModule { }
