import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UsuariosRoutingModule } from './usuarios-routing.module';

import { SharedModule } from 'src/app/Modules/shared/shared.module';
import { PipesModule } from 'src/app/Modules/shared/pipes/pipes.module';
import { RolStructureComponent, RolTypeComponent, OptionRolComponent, TypeUserComponent, OptionUserComponent, RolSelectComponent, RolUserComponent } from './components';
import { ListadoUsuariosComponent, AgregarUsuariosComponent, EditarUsuarioComponent, UsuarioComponent, ListadoRolesComponent, RolComponent, EditarRolComponent, AgregarRolComponent } from './pages';



@NgModule({
  declarations: [

    //Pages
    ListadoUsuariosComponent,
    AgregarUsuariosComponent,
    EditarUsuarioComponent,
    UsuarioComponent,
    ListadoRolesComponent,
    RolComponent,
    EditarRolComponent,
    AgregarRolComponent,



    //Components
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
