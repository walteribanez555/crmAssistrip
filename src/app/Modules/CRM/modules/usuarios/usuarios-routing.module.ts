import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AgregarUsuariosComponent } from "./agregar-usuarios/agregar-usuarios.component";
import { ListadoUsuariosComponent } from "./listado-usuarios/listado-usuarios.component";
import { UsuarioComponent } from "./usuario/usuario.component";
import { ListadoRolesComponent } from "./listado-roles/listado-roles.component";
import { RolComponent } from "./rol/rol.component";
import { EditarRolComponent } from "./editar-rol/editar-rol.component";
import { AgregarRolComponent } from "./agregar-rol/agregar-rol.component";
import { EditarUsuarioComponent } from "./editar-usuario/editar-usuario.component";


const routes: Routes = [
    {
        path: 'usuarios',
        children: [
            {
                path: 'agregar-usuarios',
                component: AgregarUsuariosComponent
            },
            {
                path: 'listado-usuarios',
                component : ListadoUsuariosComponent
            },
            {
                path : 'usuario/:id',
                component : UsuarioComponent,

            },
            {
                path : 'usuario/:id/edit',
                component : EditarUsuarioComponent,
            },
            {
              path : 'agregar-rol',
              component : AgregarRolComponent,
            },
            {
              path : 'listado-roles',
              component : ListadoRolesComponent,
            },
            {
              path : 'rol/:id',
              component : RolComponent,
            },
            {
              path : 'rol/:id/edit',
              component : EditarRolComponent,
            }


        ]
    }


];



@NgModule({
    imports:[
        RouterModule.forChild(routes),
    ],
    exports : [RouterModule],
})
export class UsuariosRoutingModule{

}
