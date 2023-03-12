import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtractDatePipe } from './extract-date.pipe';



@NgModule({
  declarations: [
    ExtractDatePipe
  ],
  
  exports: [ 
    ExtractDatePipe
  ]
})
export class PipesModule { }
