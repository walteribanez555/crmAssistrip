import { NgModule } from '@angular/core';
import { PopupComponent } from './Components/popup/popup.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    PopupComponent,
    


  ],
  imports:[
    CommonModule,

  ],
  
  exports: [ 
    PopupComponent

  ]
})
export class SharedModule { }
