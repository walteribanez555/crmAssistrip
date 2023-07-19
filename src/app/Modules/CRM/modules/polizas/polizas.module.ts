import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsModule } from '../../components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/Modules/shared/pipes/pipes.module';
import { PolizasRoutingModule } from './polizas-routing.module';
import { ListadoPolizasComponent } from './pages/listado-polizas/listado-polizas.component';
import { PolizaComponent } from './pages/poliza/poliza.component';
import { EditComponent } from './pages/edit/edit.component';
import { SharedModule } from 'src/app/Modules/shared/shared.module';
import { BeneficiarioComponent } from './components/beneficiario/beneficiario.component';
import { GenerarPolizasComponent } from './pages/generar-polizas/generar-polizas.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';







@NgModule({
  declarations: [
    ListadoPolizasComponent,
    GenerarPolizasComponent,
    PolizaComponent,
    EditComponent,

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
