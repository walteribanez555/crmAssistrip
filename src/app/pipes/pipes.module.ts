import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtractDatePipe } from './extract-date.pipe';
import { DollarPipe } from './dolar.pipe';



@NgModule({
  declarations: [
    ExtractDatePipe,
    DollarPipe
  ],
  
  exports: [ 
    ExtractDatePipe
  ]
})
export class PipesModule { }
