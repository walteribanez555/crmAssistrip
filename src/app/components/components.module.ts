import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDatesDestinationComponent } from './form-dates-destination/form-dates-destination.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListPoliciesGroupComponent } from './list-policies-group/list-policies-group.component';
import { PipesModule } from '../pipes/pipes.module';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CotizacionComponentComponent } from './cotizacion-component/cotizacion-component.component';
import { DataCotizadorComponent } from './data-cotizador/data-cotizador.component';




@NgModule({
    declarations: [
      FormDatesDestinationComponent,
      ListPoliciesGroupComponent,
      ClienteFormComponent,
      CotizacionComponentComponent,
      DataCotizadorComponent,
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
      ClienteFormComponent,
      CotizacionComponentComponent,
      DataCotizadorComponent
    ]
  })
  export class ComponentsModule { }