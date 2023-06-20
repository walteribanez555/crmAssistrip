import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { SiniestroComponent } from './pages/siniestro/siniestro.component';
import { SiniestroEditComponent } from './pages/siniestro-edit/siniestro-edit.component';
import { SiniestrosComponent } from './pages/siniestros/siniestros.component';

const routes: Routes = [
  {
    path : 'siniestro',
    component : LayoutPageComponent,
    children : [
      {
        path: 'listado-siniestros',
        component : SiniestrosComponent,
      },
      {
        path : ':id',
        component : SiniestroComponent,
      },
      {
        path:  ':id/edit',
        component : SiniestroEditComponent,
      },


    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiniestrosRoutingModule { }
