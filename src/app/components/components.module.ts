import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDatesDestinationComponent } from './form-dates-destination/form-dates-destination.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListPoliciesGroupComponent } from './list-policies-group/list-policies-group.component';
import { PipesModule } from '../pipes/pipes.module';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';



@NgModule({
    declarations: [
      FormDatesDestinationComponent,
      ListPoliciesGroupComponent,
      ClienteFormComponent,
      
    ],
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      PipesModule,
      SweetAlert2Module,
      
      
    ],
    exports: [
      FormDatesDestinationComponent,
      ListPoliciesGroupComponent,
      ClienteFormComponent
    ]
  })
  export class ComponentsModule { }