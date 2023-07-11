import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenerarCotizacionComponent } from './pages/generar-cotizacion/generar-cotizacion.component';
import { ComponentsModule } from '../../components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/Modules/shared/pipes/pipes.module';
import { PolizasRoutingModule } from './polizas-routing.module';
import { ListadoPolizasComponent } from './pages/listado-polizas/listado-polizas.component';
import { GenerarPolizasComponent } from './pages/generar-polizas/generar-polizas.component';
import { PolizaComponent } from './pages/poliza/poliza.component';
import { EditComponent } from './pages/edit/edit.component';
import { SharedModule } from 'src/app/Modules/shared/shared.module';
import { BeneficiarioComponent } from './components/beneficiario/beneficiario.component';







@NgModule({
  declarations: [
    ListadoPolizasComponent,
    GenerarPolizasComponent,
    GenerarCotizacionComponent,
    PolizaComponent,
    EditComponent,

    BeneficiarioComponent,






  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    FormsModule,
    PipesModule,
    PolizasRoutingModule,
    SharedModule,







  ],
  exports: [

  ],
  providers:[

  ]
})
export class PolizasModule { }
