import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDatesDestinationComponent } from './form-dates-destination/form-dates-destination.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListPoliciesGroupComponent } from './list-policies-group/list-policies-group.component';
import { PipesModule } from '../pipes/pipes.module';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';



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
      PipesModule
      
      
    ],
    exports: [
      FormDatesDestinationComponent,
      ListPoliciesGroupComponent,
      ClienteFormComponent
    ]
  })
  export class ComponentsModule { }