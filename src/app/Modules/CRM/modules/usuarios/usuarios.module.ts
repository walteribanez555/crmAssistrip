import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListadoUsuariosComponent } from './listado-usuarios/listado-usuarios.component';
import { AgregarUsuariosComponent } from './agregar-usuarios/agregar-usuarios.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { SharedModule } from 'src/app/Modules/shared/shared.module';
import { ListadoRolesComponent } from './listado-roles/listado-roles.component';
import { RolComponent } from './rol/rol.component';
import { EditarRolComponent } from './editar-rol/editar-rol.component';
import { AgregarRolComponent } from './agregar-rol/agregar-rol.component';
import { RolStructureComponent } from './components/rol-structure/rol-structure.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RolTypeComponent } from './components/rol-type/rol-type.component';
import { OptionRolComponent } from './components/option-rol/option-rol.component';
import { TypeUserComponent } from './components/type-user/type-user.component';
import { OptionUserComponent } from './components/option-user/option-user.component';
import { RolSelectComponent } from './components/rol-select/rol-select.component';
import { PipesModule } from 'src/app/Modules/shared/pipes/pipes.module';
import { RolUserComponent } from './components/rol-user/rol-user.component';



@NgModule({
  declarations: [
    ListadoUsuariosComponent,
    AgregarUsuariosComponent,
    EditarUsuarioComponent,
    UsuarioComponent,
    ListadoRolesComponent,
    RolComponent,
    EditarRolComponent,
    AgregarRolComponent,
    RolStructureComponent,
    RolTypeComponent,
    OptionRolComponent,
    TypeUserComponent,
    OptionUserComponent,
    RolSelectComponent,
    RolUserComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
  ],
  exports: [

  ]
})
export class UsuariosModule { }
