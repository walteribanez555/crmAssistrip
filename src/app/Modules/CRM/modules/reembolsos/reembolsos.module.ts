import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReembolsosRoutingModule } from './reembolsos-routing.module';
import { ListadoComponent } from './pages/listado/listado.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ReembolsoComponent } from './pages/reembolso/reembolso.component';
import { RouterModule } from '@angular/router';
import { EditComponent } from './pages/edit/edit.component';


@NgModule({
  declarations: [
    ListadoComponent,
    LayoutPageComponent,
    ReembolsoComponent,
    EditComponent,

  ],
  imports: [
    CommonModule,
    ReembolsosRoutingModule,
    RouterModule,
  ]
})
export class ReembolsosModule { }
