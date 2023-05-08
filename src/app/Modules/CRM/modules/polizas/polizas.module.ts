import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoPolizasComponent } from './listado-polizas/listado-polizas.component';
import { GenerarPolizasComponent } from './generar-polizas/generar-polizas.component';
import { GenerarCotizacionComponent } from './generar-cotizacion/generar-cotizacion.component';
import { ComponentsModule } from '../../components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/Modules/shared/pipes/pipes.module';
import { PolizasRoutingModule } from './polizas-routing.module';







@NgModule({
  declarations: [
    ListadoPolizasComponent,
    GenerarPolizasComponent,
    GenerarCotizacionComponent,

    
    
    
    
    
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentsModule,
    PipesModule,
    PolizasRoutingModule,
    

    
    
    
        
    
  ],
  exports: [ 
    ListadoPolizasComponent,
    GenerarPolizasComponent,
    GenerarCotizacionComponent
  ],
  providers:[
    
  ]
})
export class PolizasModule { }
