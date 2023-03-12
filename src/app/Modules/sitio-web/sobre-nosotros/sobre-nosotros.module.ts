import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextoSuperiorComponent } from './texto-superior/texto-superior.component';
import { BannerIntermedioSobreNosotrosComponent } from './banner-intermedio/banner-intermedio.component';



@NgModule({
  declarations: [
    TextoSuperiorComponent,
    BannerIntermedioSobreNosotrosComponent
  ],
  imports: [
    CommonModule,
    SobreNosotrosModule
  ],
  exports: [
    TextoSuperiorComponent,
    BannerIntermedioSobreNosotrosComponent
  ]
})
export class SobreNosotrosModule { }
