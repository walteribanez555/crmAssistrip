import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrmRoutingModule } from './crm-routing.module';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../shared/pipes/pipes.module';
import { ComponentsModule } from './components/components.module';
import { DashboardComponent } from './dashboard.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SessionInterceptor } from '../shared/interceptors/session.interceptor';
import { ErrorInterceptor } from '../shared/interceptors/error.interceptor';



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







  ]

  ,
  providers : [

  ]
})
export class CrmModule { }
