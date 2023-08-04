import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AgregarUsuariosComponent } from "./pages/agregar-usuarios/agregar-usuarios.component";
import { ListadoUsuariosComponent } from "./pages/listado-usuarios/listado-usuarios.component";
import { UsuarioComponent } from "./pages/usuario/usuario.component";
import { ListadoRolesComponent } from "./pages/listado-roles/listado-roles.component";
import { RolComponent } from "./pages/rol/rol.component";
import { EditarRolComponent } from "./pages/editar-rol/editar-rol.component";
import { AgregarRolComponent } from "./pages/agregar-rol/agregar-rol.component";
import { EditarUsuarioComponent } from "./pages/editar-usuario/editar-usuario.component";


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
