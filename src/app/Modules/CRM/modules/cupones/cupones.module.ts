import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoCuponesComponent } from './listado-cupones/listado-cupones.component';
import { CrearCuponesComponent } from './crear-cupones/crear-cupones.component';
import { CuponesRoutingModule } from './cupones-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { PipesModule } from 'src/app/Modules/shared/pipes/pipes.module';



@NgModule({
  declarations: [
    ListadoCuponesComponent,
    CrearCuponesComponent,
    
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    CuponesRoutingModule,
    PipesModule,
    
  ],
  exports:[
    
  ],
  providers: [
 
  ]


})
export class CuponesModule { }
