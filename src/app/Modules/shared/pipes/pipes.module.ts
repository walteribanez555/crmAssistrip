import { NgModule } from '@angular/core';
import { ExtractDatePipe } from './extract-date.pipe';
import { DollarPipe } from './dolar.pipe';
import { DateOnlyPipe } from './getDateOnly.pipe';



@NgModule({
  declarations: [
    ExtractDatePipe,
    DollarPipe,
    DateOnlyPipe,
  ],
  
  exports: [ 
    ExtractDatePipe,
    DollarPipe,
    DateOnlyPipe,
  ]
})
export class PipesModule { }
