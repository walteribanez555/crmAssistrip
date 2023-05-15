import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoCampComponent } from './listado-camp/listado-camp.component';
import { CrearCampComponent } from './crear-camp/crear-camp.component';
import { CampDescuentosRoutingModule } from './camp-descuentos-routing.module';
import { PipesModule } from 'src/app/Modules/shared/pipes/pipes.module';



@NgModule({
  declarations: [
    ListadoCampComponent,
    CrearCampComponent,

    
  ],
  imports: [
    CommonModule,
    CampDescuentosRoutingModule,
    PipesModule,
    
  ],
  exports: [
    ListadoCampComponent,
    CrearCampComponent
  ]
})
export class CampDescuentosModule { }
