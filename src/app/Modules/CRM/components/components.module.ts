import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { CotizacionComponentComponent } from './cotizacion-component/cotizacion-component.component';
import { FormDatesDestinationComponent } from './form-dates-destination/form-dates-destination.component';
import { ListPolizasComponent } from './list-polizas/list-polizas.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { ListPoliciesGroupComponent } from './list-policies-group/list-policies-group.component';



@NgModule({
  declarations: [
    ClienteFormComponent,
    CotizacionComponentComponent,
    FormDatesDestinationComponent,
    ListPolizasComponent,
    ListPoliciesGroupComponent,


  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,


  ],
  exports: [
    ClienteFormComponent,
    CotizacionComponentComponent,
    FormDatesDestinationComponent,
    ListPolizasComponent,
    ListPoliciesGroupComponent

  ]
})
export class ComponentsModule { }
