import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoCuponesComponent } from './listado-cupones/listado-cupones.component';
import { CrearCuponesComponent } from './crear-cupones/crear-cupones.component';
import { CuponesRoutingModule } from './cupones-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { PipesModule } from 'src/app/Modules/shared/pipes/pipes.module';
import { ComponentsModule } from '../../components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CuponComponent } from './cupon/cupon.component';
import { EditCuponComponent } from './edit-cupon/edit-cupon.component';
import { PopupComponent } from 'src/app/Modules/shared/Components/popup/popup.component';
import { SharedModule } from 'src/app/Modules/shared/shared.module';




@NgModule({
  declarations: [
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
