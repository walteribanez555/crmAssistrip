import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiniestrosComponent } from './siniestros/siniestros.component';
import { PolizasComponent } from './polizas/polizas.component';
import { ReembolsosComponent } from './reembolsos/reembolsos.component';
import { ReportesRoutingModule } from './reportes-routing.module';
import { PipesModule } from 'src/app/Modules/shared/pipes/pipes.module';



@NgModule({
  declarations: [
    SiniestrosComponent,
    PolizasComponent,
    ReembolsosComponent
  ],
  imports: [
    CommonModule,
    ReportesRoutingModule,
    PipesModule,
  ],
  exports: [
    SiniestrosComponent,
    PolizasComponent,
    ReembolsosComponent
  ]
})
export class ReportesModule { }
