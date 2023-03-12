import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoCuponesComponent } from './listado-cupones/listado-cupones.component';
import { CrearCuponesComponent } from './crear-cupones/crear-cupones.component';
import { CuponesRoutingModule } from './cupones-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ServicesModule } from 'src/app/services/services.module';



@NgModule({
  declarations: [
    ListadoCuponesComponent,
    CrearCuponesComponent,
    
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    CuponesRoutingModule,
    ServicesModule,
    PipesModule
  ],
  exports:[
    ListadoCuponesComponent,
    CrearCuponesComponent
  ],
  providers: [
 
  ]


})
export class CuponesModule { }
