
import { NgModule } from "@angular/core";
import { RouterModule,Routes} from "@angular/router";
import { CrearCuponesComponent } from "./crear-cupones/crear-cupones.component";
import { ListadoCuponesComponent } from "./listado-cupones/listado-cupones.component";




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