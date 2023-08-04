import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';




import { SiniestrosRoutingModule } from './siniestros-routing.module';
import { RouterModule } from '@angular/router';
import { PipesModule } from 'src/app/Modules/shared/pipes/pipes.module';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/Modules/shared/shared.module';
import { SiniestroDataComponent, MessageComponent, MensajeFormComponent, ListMessagesComponent, BeneficiarioComponent } from './components';
import { LayoutPageComponent, SiniestroComponent, SiniestroEditComponent, SiniestrosComponent } from './pages';

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
