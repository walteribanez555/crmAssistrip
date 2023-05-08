import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';



import { DateOnlyPipe } from './Modules/shared/pipes/getDateOnly.pipe';

import { CommonModule } from '@angular/common';
import { BeneficiosService } from './Modules/shared/services/requests/beneficios.service';
import { CatalogosService } from './Modules/shared/services/requests/catalogos.service';
import { ClientesService } from './Modules/shared/services/requests/clientes.service';
import { CuponesService } from './Modules/shared/services/requests/cupones.service';
import { ExtrasService } from './Modules/shared/services/requests/extras.service';
import { PlanesService } from './Modules/shared/services/requests/planes.service';
import { PolizasService } from './Modules/shared/services/requests/polizas.service';
import { PreciosService } from './Modules/shared/services/requests/precios.service';
import { ServiciosService } from './Modules/shared/services/requests/servicios.service';
import { GetLocationService } from './Modules/shared/services/get-location.service';
import { VentasService } from './Modules/shared/services/requests/ventas.service';
import { ExtrasPolizasService } from './Modules/shared/services/requests/beneficiosExtras.service';
import { BeneficiariosService } from './Modules/shared/services/requests/beneficiarios.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExtractDatePipe } from './Modules/shared/pipes/extract-date.pipe';
import { DollarPipe } from './Modules/shared/pipes/dolar.pipe';
import { PipesModule } from './Modules/shared/pipes/pipes.module';







@NgModule({
  declarations: [
    AppComponent,

    
    

  ],
  imports: [
    BrowserModule,
    SweetAlert2Module.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PipesModule,
    
    
    
  
    
  ],
  providers: [
    BeneficiosService,
    CatalogosService,
    ClientesService,
    CuponesService,
    ExtrasService,
    PlanesService,
    PolizasService,
    PreciosService,
    ServiciosService,
    GetLocationService,
    VentasService,
    ExtrasPolizasService,
    BeneficiariosService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
