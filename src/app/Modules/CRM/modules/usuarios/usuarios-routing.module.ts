import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AgregarUsuariosComponent } from "./agregar-usuarios/agregar-usuarios.component";
import { ListadoUsuariosComponent } from "./listado-usuarios/listado-usuarios.component";


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
