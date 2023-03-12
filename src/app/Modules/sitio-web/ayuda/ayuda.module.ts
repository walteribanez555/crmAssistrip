import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { ContactoComponent } from './contacto/contacto.component';
import { RedesSocialesComponent } from './redes-sociales/redes-sociales.component';
import { AyudaRoutingModule } from './ayuda-routing.module';



@NgModule({
  declarations: [
    PreguntasComponent,
    ContactoComponent,
    RedesSocialesComponent
  ],
  imports: [
    CommonModule,
    AyudaRoutingModule
  ],
  exports:[
    ContactoComponent,
    PreguntasComponent,
    RedesSocialesComponent
  ]

})
export class AyudaModule { }
