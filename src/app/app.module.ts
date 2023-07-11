import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';




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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from './Modules/shared/pipes/pipes.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SiniestroService } from './Modules/shared/services/requests/siniestro.service';
import { MensajeService } from './Modules/shared/services/requests/mensaje.service';
import { TransformDataService } from './Modules/shared/services/utils/transform-data.service';
import { SessionInterceptor } from './Modules/shared/interceptors/session.interceptor';
import { ErrorInterceptor } from './Modules/shared/interceptors/error.interceptor';
import { RolService } from './Modules/shared/services/requests/rol.service';
import { UserService } from './Modules/shared/services/requests/user.service';







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
    BrowserAnimationsModule





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
    SiniestroService,
    MensajeService,
    TransformDataService,
    RolService,
    UserService,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : SessionInterceptor,
      multi : true,
    },
    {
      provide : HTTP_INTERCEPTORS,
      useClass : ErrorInterceptor,
      multi : true,
    }


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
