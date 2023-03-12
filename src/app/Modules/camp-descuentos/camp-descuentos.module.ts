import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoCampComponent } from './listado-camp/listado-camp.component';
import { CrearCampComponent } from './crear-camp/crear-camp.component';
import { CampDescuentosRoutingModule } from './camp-descuentos-routing.module';



@NgModule({
  declarations: [
    ListadoCampComponent,
    CrearCampComponent
  ],
  imports: [
    CommonModule,
    CampDescuentosRoutingModule
  ],
  exports: [
    ListadoCampComponent,
    CrearCampComponent
  ]
})
export class CampDescuentosModule { }
