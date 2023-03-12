import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GenerarCotizacionComponent } from "./generar-cotizacion/generar-cotizacion.component";
import { GenerarPolizasComponent } from "./generar-polizas/generar-polizas.component";
import { ListadoPolizasComponent } from "./listado-polizas/listado-polizas.component";

const routes : Routes = [

    {
        path:'polizas',
        children: [
            {
                path:'generar-cotizacion',
                component : GenerarCotizacionComponent,
            },
            {
                path: 'generar-polizas',
                component : GenerarPolizasComponent
            },
            {
                path : 'listado-polizas',
                component : ListadoPolizasComponent
            }
        ]
    }

   
]



@NgModule({
    imports: [
        RouterModule.forChild(routes),
        
    ],
    exports: [RouterModule],
})

export class PolizasRoutingModule{

}
