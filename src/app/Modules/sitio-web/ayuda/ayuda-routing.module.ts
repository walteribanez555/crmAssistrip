import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContactoComponent } from "./contacto/contacto.component";
import { PreguntasComponent } from "./preguntas/preguntas.component";
import { RedesSocialesComponent } from "./redes-sociales/redes-sociales.component";


const routes: Routes = [
    {
        path: 'ayuda',
        children : [
            {
                path: 'contacto',
                component: ContactoComponent
            },
            {
                path: 'preguntas',
                component : PreguntasComponent
            },
            {
                path : 'redes-sociales',
                component : RedesSocialesComponent
            }
        ]
    }

    
]

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports : [RouterModule]
})
export class AyudaRoutingModule{

}