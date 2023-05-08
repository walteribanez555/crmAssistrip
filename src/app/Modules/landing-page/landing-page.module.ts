import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { CotizarComponent } from './components/cotizar/cotizar.component';
import { DataCotizadorComponent } from './components/data-cotizador/data-cotizador.component';
import { DatosPolizasComponent } from './components/datos-polizas/datos-polizas.component';
import { HomeComponent } from './components/home/home.component';
import { ListPolizasComponent } from './components/list-polizas/list-polizas.component';
import { PolizaComponent } from './components/poliza/poliza.component';
import { PolizasDetallesComponent } from './components/polizas-detalles/polizas-detalles.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../shared/pipes/pipes.module';
import { RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page.component';


@NgModule({
  declarations: [
    CotizarComponent,
    DataCotizadorComponent,
    DatosPolizasComponent,
    CotizarComponent,
    HomeComponent,
    ListPolizasComponent,
    PolizaComponent,
    PolizasDetallesComponent,
    LandingPageComponent,
  ],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    
    RouterModule,
    
  ]
})
export class LandingPageModule { }
