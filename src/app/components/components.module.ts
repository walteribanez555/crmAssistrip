import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDatesDestinationComponent } from './form-dates-destination/form-dates-destination.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
    declarations: [
      FormDatesDestinationComponent
      
    ],
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      
    ],
    exports: [
      FormDatesDestinationComponent
    ]
  })
  export class ComponentsModule { }