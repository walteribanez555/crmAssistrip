import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiniestrosComponent } from './siniestros/siniestros.component';
import { PolizasComponent } from './polizas/polizas.component';
import { ReembolsosComponent } from './reembolsos/reembolsos.component';
import { ReportesRoutingModule } from './reportes-routing.module';



@NgModule({
  declarations: [
    SiniestrosComponent,
    PolizasComponent,
    ReembolsosComponent
  ],
  imports: [
    CommonModule,
    ReportesRoutingModule
  ],
  exports: [
    SiniestrosComponent,
    PolizasComponent,
    ReembolsosComponent
  ]
})
export class ReportesModule { }
