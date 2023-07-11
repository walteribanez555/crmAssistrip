import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { SiniestroComponent } from './pages/siniestro/siniestro.component';
import { SiniestroEditComponent } from './pages/siniestro-edit/siniestro-edit.component';
import { SiniestrosComponent } from './pages/siniestros/siniestros.component';


import { SiniestrosRoutingModule } from './siniestros-routing.module';
import { RouterModule } from '@angular/router';
import { PipesModule } from 'src/app/Modules/shared/pipes/pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SiniestroDataComponent } from './components/siniestro-data/siniestro-data.component';
import { MessageComponent } from './components/message/message.component';
import { MensajeFormComponent } from './components/mensaje-form/mensaje-form.component';
import { ListMessagesComponent } from './components/list-messages/list-messages.component';
import { SharedModule } from 'src/app/Modules/shared/shared.module';
import { BeneficiarioComponent } from './components/beneficiario/beneficiario.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';


@NgModule({
  declarations: [
    //Pages
    LayoutPageComponent,
    SiniestroComponent,
    SiniestroEditComponent,
    SiniestrosComponent,

    //Components
    SiniestroDataComponent,
    MessageComponent,
    MensajeFormComponent,
    ListMessagesComponent,
    BeneficiarioComponent,
  ],
  imports: [
    CommonModule,
    SiniestrosRoutingModule,
    RouterModule,
    PipesModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgxIntlTelInputModule,


  ],
  exports: [
    SiniestroDataComponent,
  ]
})
export class SiniestrosModule { }
