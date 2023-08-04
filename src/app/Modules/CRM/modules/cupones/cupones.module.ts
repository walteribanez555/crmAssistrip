import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CuponesRoutingModule } from './cupones-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { PipesModule } from 'src/app/Modules/shared/pipes/pipes.module';
import { ComponentsModule } from '../../components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/Modules/shared/shared.module';
import { ListadoCuponesComponent, CrearCuponesComponent, CuponComponent, EditCuponComponent } from './pages';




@NgModule({
  declarations: [

    //Pages
    ListadoCuponesComponent,
    CrearCuponesComponent,
    CuponComponent,
    EditCuponComponent,

  ],
  imports: [
    CommonModule,
    HttpClientModule,
    CuponesRoutingModule,
    PipesModule,
    ComponentsModule,
    ReactiveFormsModule,
    FormsModule,
    PipesModule,
    SharedModule

  ],
  exports:[

  ],
  providers: [

  ]


})
export class CuponesModule { }
