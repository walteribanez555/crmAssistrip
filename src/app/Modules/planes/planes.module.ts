import { CommonModule } from '@angular/common';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { ServiciosService } from 'src/app/services/servicios.service';
import { CrearCategoriaComponent } from './crear-categoria/crear-categoria.component';
import { CrearCoberturaComponent } from './crear-cobertura/crear-cobertura.component';
import { CrearPlanComponent } from './crear-plan/crear-plan.component';
import { ListadoPlanesComponent } from './listado-planes/listado-planes.component';


import { PlanesRoutingModule } from './planes-routing.module';
import { ServicesModule } from 'src/app/services/services.module';
import { PipesModule } from 'src/app/pipes/pipes.module';



@NgModule({
  declarations: [
    CrearCategoriaComponent,
    CrearCoberturaComponent,
    CrearPlanComponent,
    ListadoPlanesComponent,


  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    PlanesRoutingModule,
    ServicesModule,
    PipesModule


  ],
  exports: [
    CrearCategoriaComponent,
    CrearCoberturaComponent,
    CrearPlanComponent,
    ListadoPlanesComponent
  ],
  providers: [
    
  ]
  
})
export class PlanesModule { }
