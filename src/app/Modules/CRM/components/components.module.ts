import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../../shared/pipes/pipes.module';
import { ClienteFormComponent, CotizacionComponentComponent, FormDatesDestinationComponent, ListPoliciesGroupComponent, ListPolizasComponent, NavbarComponent, SidebarComponent } from './components';



@NgModule({
  declarations: [
    ClienteFormComponent,
    CotizacionComponentComponent,
    FormDatesDestinationComponent,
    ListPolizasComponent,
    ListPoliciesGroupComponent,
    SidebarComponent,
    NavbarComponent,


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
    ListPoliciesGroupComponent,
    SidebarComponent,
    NavbarComponent,

  ]
})
export class ComponentsModule { }
