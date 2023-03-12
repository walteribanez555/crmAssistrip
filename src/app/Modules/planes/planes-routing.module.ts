
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from "@angular/router";
import { CrearCategoriaComponent } from "./crear-categoria/crear-categoria.component";
import { CrearCoberturaComponent } from "./crear-cobertura/crear-cobertura.component";
import { CrearPlanComponent } from "./crear-plan/crear-plan.component";
import { ListadoPlanesComponent } from "./listado-planes/listado-planes.component";



const routes : Routes = [
    {
        path: 'planes',
        children: [
            {
                path:'crear-categoria',
                component: CrearCategoriaComponent,
            },
            {
                path:'crear-cobertura',
                component: CrearCoberturaComponent
            },
            {
                path: 'crear-plan',
                component : CrearPlanComponent
            },
            {
                path: 'listado-planes',
                component: ListadoPlanesComponent
            }
        ]
    }

]



@NgModule({
    imports:[
        RouterModule.forChild(routes),

        BrowserAnimationsModule

    ],
    exports:[RouterModule],
})
export class PlanesRoutingModule{

}
