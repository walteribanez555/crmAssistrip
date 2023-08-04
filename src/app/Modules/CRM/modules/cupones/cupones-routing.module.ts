
import { NgModule } from "@angular/core";
import { RouterModule,Routes} from "@angular/router";
import { CrearCuponesComponent } from "./pages/crear-cupones/crear-cupones.component";
import { ListadoCuponesComponent } from "./pages/listado-cupones/listado-cupones.component";
import { CuponComponent } from "./pages/cupon/cupon.component";
import { EditCuponComponent } from "./pages/edit-cupon/edit-cupon.component";




const routes: Routes = [
    {
        path: 'cupones',
        children : [

            {
                path:'crear-cupones',
                component: CrearCuponesComponent
            },
            {
                path: 'listado-cupones',
                component : ListadoCuponesComponent
            },
            {
                path: ':id',
                component : CuponComponent,
            },
            {
                path: ':id/editar',
                component : EditCuponComponent,
            }



        ]

    }
]


@NgModule({
    imports: [
        RouterModule.forChild(routes),

    ],
    exports:[RouterModule],
})


export class CuponesRoutingModule{

}
