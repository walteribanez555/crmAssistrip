import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeneficiosService } from './beneficios.service';
import { CatalogosService } from './catalogos.service';
import { ClientesService } from './clientes.service';
import { CuponesService } from './cupones.service';
import { ExtrasService } from './extras.service';
import { PlanesService } from './planes.service';
import { PolizasService } from './polizas.service';
import { PreciosService } from './precios.service';
import { ServiciosService } from './servicios.service';
import { GetLocationService } from './get-location.service';



@NgModule({
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
    GetLocationService
  ],
  
})
export class ServicesModule { }
