import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";


import { GenerarCotizacionComponent } from "./pages/generar-cotizacion/generar-cotizacion.component";
import { GenerarPolizasComponent } from "./pages/generar-polizas/generar-polizas.component";
import { ListadoPolizasComponent } from "./pages/listado-polizas/listado-polizas.component";
import { PolizaComponent } from "./pages/poliza/poliza.component";
import { EditComponent } from "./pages/edit/edit.component";


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
            },
            {
              path : ':id',
              component : PolizaComponent,
            },
            {
              path : ':id/edit',
              component : EditComponent,
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
