import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BannerInferiorComponent } from "./banner-inferior/banner-inferior.component";
import { BannerIntermedioInicioComponent } from "./banner-intermedio/banner-intermedio.component";
import { BannerSuperiorComponent } from "./banner-superior/banner-superior.component";
import { CaruselPrincipalComponent } from "./carusel-principal/carusel-principal.component";
import { ComoFuncionaComponent } from "./como-funciona/como-funciona.component";


const routes : Routes = [
    {
        path: 'inicio',
        children: 
        [
            {
                path:'banner-inferior',
                component : BannerInferiorComponent
            },
            {
                path:'banner-intermedio',
                component : BannerIntermedioInicioComponent
            },
            {
                path: 'banner-superior',
                component : BannerSuperiorComponent
            },
            {
                path: 'carusel-principal',
                component : CaruselPrincipalComponent,
            },
            {
                path: 'como-funciona',
                component : ComoFuncionaComponent
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
export class InicioRoutingModule{

}