import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { ServicesModule } from './services/services.module';
import { ComponentsModule } from './components/components.module';
import { HomeComponent } from './components/home/home.component';
import { CotizarComponent } from './components/cotizar/cotizar.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatosPolizasComponent } from './components/datos-polizas/datos-polizas.component';
import { ListPolizasComponent } from './components/list-polizas/list-polizas.component';
import { PolizasDetallesComponent } from './components/polizas-detalles/polizas-detalles.component';
import { DateOnlyPipe } from './pipes/getDateOnly.pipe';

import { CommonModule } from '@angular/common';
import { ListadoBeneficiariosComponent } from './components/listado-beneficiarios/listado-beneficiarios.component';
import { PolizaComponent } from './components/poliza/poliza.component';





@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LandingPageComponent,
    HomeComponent,
    CotizarComponent,
    
    DatosPolizasComponent,
    ListPolizasComponent,
    PolizasDetallesComponent,
    DateOnlyPipe,
    ListadoBeneficiariosComponent,
    PolizaComponent

  ],
  imports: [
    BrowserModule,
    SweetAlert2Module.forRoot(),
    AppRoutingModule,
    ComponentsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule
    
    
  
    
  ],
  providers: [
    DateOnlyPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
