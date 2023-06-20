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







@NgModule({
  declarations: [
    ListadoPolizasComponent,
    GenerarPolizasComponent,
    GenerarCotizacionComponent,
    PolizaComponent,
    EditComponent,






  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    FormsModule,
    PipesModule,
    PolizasRoutingModule,







  ],
  exports: [

  ],
  providers:[

  ]
})
export class PolizasModule { }
