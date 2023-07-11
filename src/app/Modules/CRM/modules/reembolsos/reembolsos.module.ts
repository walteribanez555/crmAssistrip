import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReembolsosRoutingModule } from './reembolsos-routing.module';
import { ListadoComponent } from './pages/listado/listado.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ReembolsoComponent } from './pages/reembolso/reembolso.component';
import { RouterModule } from '@angular/router';
import { EditComponent } from './pages/edit/edit.component';
import { SharedModule } from 'src/app/Modules/shared/shared.module';
import { SiniestrosModule } from '../siniestros/siniestros.module';
import { FormReembolsoComponent } from './components/form-reembolso/form-reembolso.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListReembolsosComponent } from './components/list-reembolsos/list-reembolsos.component';


@NgModule({
  declarations: [
    ListadoComponent,
    LayoutPageComponent,
    ReembolsoComponent,
    EditComponent,
    FormReembolsoComponent,
    ListReembolsosComponent,

  ],
  imports: [
    CommonModule,
    ReembolsosRoutingModule,
    RouterModule,
    SharedModule,
    SiniestrosModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ReembolsosModule { }
