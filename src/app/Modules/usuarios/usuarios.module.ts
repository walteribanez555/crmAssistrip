import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoUsuariosComponent } from './listado-usuarios/listado-usuarios.component';
import { AgregarUsuariosComponent } from './agregar-usuarios/agregar-usuarios.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';



@NgModule({
  declarations: [
    ListadoUsuariosComponent,
    AgregarUsuariosComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule
  ],
  exports: [
    AgregarUsuariosComponent,
    ListadoUsuariosComponent
  ]
})
export class UsuariosModule { }
