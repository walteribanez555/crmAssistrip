import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerSuperiorComponent } from './banner-superior/banner-superior.component';
import { CaruselPrincipalComponent } from './carusel-principal/carusel-principal.component';
import { BannerIntermedioInicioComponent } from './banner-intermedio/banner-intermedio.component';
import { ComoFuncionaComponent } from './como-funciona/como-funciona.component';
import { BannerInferiorComponent } from './banner-inferior/banner-inferior.component';



@NgModule({
  declarations: [
    BannerSuperiorComponent,
    CaruselPrincipalComponent,
    BannerIntermedioInicioComponent,
    ComoFuncionaComponent,
    BannerInferiorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [ 
    BannerInferiorComponent,
    BannerIntermedioInicioComponent,
    BannerSuperiorComponent,
    ComoFuncionaComponent,
    CaruselPrincipalComponent,
  ]


})
export class InicioModule { }
