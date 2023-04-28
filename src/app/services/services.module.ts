import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeneficiosService } from './requests/beneficios.service';
import { CatalogosService } from './requests/catalogos.service';
import { ClientesService } from './requests/clientes.service';
import { CuponesService } from './requests/cupones.service';
import { ExtrasService } from './requests/extras.service';
import { PlanesService } from './requests/planes.service';
import { PolizasService } from './requests/polizas.service';
import { PreciosService } from './requests/precios.service';
import { ServiciosService } from './requests/servicios.service';
import { GetLocationService } from './get-location.service';
import { VentasService } from './requests/ventas.service';
import { ExtrasPolizasService } from './requests/beneficiosExtras.service';
import { BeneficiariosService } from './requests/beneficiarios.service';



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
    GetLocationService,
    VentasService,
    ExtrasPolizasService,
    BeneficiariosService,
    ServicesModule

  ],
  
})
export class ServicesModule { }
