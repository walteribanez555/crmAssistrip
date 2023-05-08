import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BannerIntermedioSobreNosotrosComponent } from "./banner-intermedio/banner-intermedio.component";
import { TextoSuperiorComponent } from "./texto-superior/texto-superior.component";

const routes: Routes = [
    {
        path: 'sobre-nosotros',
        children : [
            {
                path: 'banner-intermedio',
                component: BannerIntermedioSobreNosotrosComponent,
            },
            {
                path:'texto-superior',
                component : TextoSuperiorComponent
            }
        ]
    }
    
]

@NgModule({
    imports:[
        RouterModule.forChild(routes),
    ],
    exports: [RouterModule]
})
export class SobreNosotrosRouting{

}