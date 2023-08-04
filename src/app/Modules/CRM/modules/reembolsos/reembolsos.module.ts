import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { ReembolsosRoutingModule } from './reembolsos-routing.module';
import { SharedModule } from 'src/app/Modules/shared/shared.module';
import { SiniestrosModule } from '../siniestros/siniestros.module';
import { PipesModule } from 'src/app/Modules/shared/pipes/pipes.module';

import { FormReembolsoComponent, ListReembolsosComponent, ReembolsoItemComponent } from './components';
import { ListadoComponent, LayoutPageComponent, ReembolsoComponent, EditComponent } from './pages';


@NgModule({
  declarations: [

    //Pages
    ListadoComponent,
    LayoutPageComponent,
    ReembolsoComponent,
    EditComponent,

    //Components
    FormReembolsoComponent,
    ListReembolsosComponent,
    ReembolsoItemComponent,

  ],
  imports: [
    CommonModule,
    ReembolsosRoutingModule,
    RouterModule,
    SharedModule,
    SiniestrosModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ]
})
export class ReembolsosModule { }
