import { NgModule } from '@angular/core';
import { PopupComponent } from './Components/popup/popup.component';
import { CommonModule } from '@angular/common';
import { FileDropComponent } from './Components/file-drop/file-drop.component';
import { LoadingProcessComponent } from './Components/loading-process/loading-process.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadFileDirective } from './directives/upload-file.directive';
import { LoadingDivComponent } from './Components/loading-div/loading-div.component';
import { SearchBoxComponent } from './Components/search-box/search-box.component';
import { NumberDisplayComponent } from './Components/number-display/number-display.component';
import { ModalComponent } from './Components/modal/modal.component';
import { DcDirective } from './directives/dc.directive';



@NgModule({
  declarations: [
    PopupComponent,
    FileDropComponent,
    LoadingProcessComponent,
    UploadFileDirective,
    LoadingDivComponent,
    SearchBoxComponent,
    NumberDisplayComponent,
    ModalComponent,


  ],
  imports:[
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DcDirective

  ],

  exports: [
    PopupComponent,
    FileDropComponent,
    LoadingProcessComponent,
    LoadingDivComponent,
    SearchBoxComponent,
    NumberDisplayComponent,

  ]
})
export class SharedModule { }
