import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsModule } from '../../components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/Modules/shared/pipes/pipes.module';
import { PolizasRoutingModule } from './polizas-routing.module';
import { SharedModule } from 'src/app/Modules/shared/shared.module';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';


import { EditComponent, GenerarPolizasComponent, ListadoPolizasComponent, PolizaComponent } from './pages';
import { BeneficiarioComponent } from './components';









@NgModule({
  declarations: [

    //Paginas
    ListadoPolizasComponent,
    GenerarPolizasComponent,
    PolizaComponent,
    EditComponent,

    //Componentes
    BeneficiarioComponent,






  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    FormsModule,
    PipesModule,
    PolizasRoutingModule,
    SharedModule,
    NgxIntlTelInputModule,







  ],
  exports: [


  ],
  providers:[

  ]
})
export class PolizasModule { }
