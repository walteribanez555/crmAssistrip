import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PolizasComponent } from "./polizas/polizas.component";
import { ReembolsosComponent } from "./reembolsos/reembolsos.component";
import { SiniestrosComponent } from "./siniestros/siniestros.component";


const routes: Routes=[
    {
        path: 'reportes',
        children:[

            {
                path : 'polizas',
                component : PolizasComponent
            },
            {
                path: 'reembolsos',
                component : ReembolsosComponent
            },
            {
                path : 'siniestros',
                component: SiniestrosComponent
            }
        ]
    }

];


@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports : [RouterModule]
})
export class ReportesRoutingModule{

}