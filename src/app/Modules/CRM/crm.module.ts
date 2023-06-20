import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrmRoutingModule } from './crm-routing.module';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../shared/pipes/pipes.module';
import { ComponentsModule } from './components/components.module';
import { DashboardComponent } from './dashboard.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';



@NgModule({
  declarations: [
     //Componentes
     DashboardComponent,



  ],
  imports: [
    CommonModule,
    CrmRoutingModule,
    ComponentsModule,



    //Modulos
    ReactiveFormsModule,
    FormsModule,
    PipesModule,
    NgxIntlTelInputModule,





  ]
})
export class CrmModule { }
