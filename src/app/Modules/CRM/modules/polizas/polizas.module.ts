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
import { ImpresionModalComponent } from './components/impresion-modal/impresion-modal.component';
import { PolizaPdfComponent } from 'src/app/Modules/shared/Components/poliza-pdf/poliza-pdf.component';
import { QRCodeModule } from 'angularx-qrcode';
import { BeneficiarioPdfComponent } from './components/beneficiario-pdf/beneficiario-pdf.component';
import { DetailComponent } from './pages/detail/detail.component';
import { PriceFormComponent } from './components/price-form/price-form.component';









@NgModule({
  declarations: [

    //Paginas
    ListadoPolizasComponent,
    GenerarPolizasComponent,
    PolizaComponent,
    EditComponent,

    //Componentes
    BeneficiarioComponent,
    ImpresionModalComponent,
    PolizaPdfComponent,
    BeneficiarioPdfComponent,
    DetailComponent,
    PriceFormComponent,






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
    QRCodeModule,








  ],
  exports: [


  ],
  providers:[

  ]
})
export class PolizasModule { }
