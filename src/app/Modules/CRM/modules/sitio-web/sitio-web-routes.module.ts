import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AyudaRoutingModule } from "./ayuda/ayuda-routing.module";
import { ContactoComponent } from "./ayuda/contacto/contacto.component";
import { PreguntasComponent } from "./ayuda/preguntas/preguntas.component";
import { RedesSocialesComponent } from "./ayuda/redes-sociales/redes-sociales.component";
import { BannerInferiorComponent } from "./inicio/banner-inferior/banner-inferior.component";
import { BannerIntermedioInicioComponent } from "./inicio/banner-intermedio/banner-intermedio.component";
import { BannerSuperiorComponent } from "./inicio/banner-superior/banner-superior.component";
import { CaruselPrincipalComponent } from "./inicio/carusel-principal/carusel-principal.component";
import { ComoFuncionaComponent } from "./inicio/como-funciona/como-funciona.component";
import { InicioRoutingModule } from "./inicio/inicio-routing.module";
import { BannerIntermedioSobreNosotrosComponent } from "./sobre-nosotros/banner-intermedio/banner-intermedio.component";
import { SobreNosotrosRouting } from "./sobre-nosotros/sobre-nosotros-routing.module";
import { TextoSuperiorComponent } from "./sobre-nosotros/texto-superior/texto-superior.component";



const routes : Routes = [
    // {
    //     path: 'sitio-web',
    //     children:[
    //       {
    //         path: 'inicio',
    //         children: [
    //           {
    //             path: 'banner-inferior',
    //             component : BannerInferiorComponent
    //           },
    //           {
    //             path: 'banner-intermedio-inicio',
    //             component: BannerIntermedioInicioComponent
    //           },
    //           {
    //             path:'banner-superior',
    //             component: BannerSuperiorComponent
    //           },
    //           {
    //             path: 'carusel-principal',
    //             component : CaruselPrincipalComponent
    //           },
    //           {
    //             path: 'como-funciona',
    //             component: ComoFuncionaComponent
    //           }
    //         ],
    //       },
    //       {
    //         path: 'ayuda',
    //         children : [
    //           {
    //             path: 'contacto',
    //             component: ContactoComponent,
    //           },
    //           {
    //             path: 'preguntas',
    //             component: PreguntasComponent
    //           },
    //           {
    //             path: 'redes-sociales',
    //             component: RedesSocialesComponent
    //           }
    //         ]
    //       },
    //       {
    //         path: 'sobre-nosotros',
    //         children: [
    //           {
    //             path: 'banner-intermedio-sobre-nosotros',
    //             component: BannerIntermedioSobreNosotrosComponent
  
    //           },
    //           {
    //             path: 'texto-superior',
    //             component: TextoSuperiorComponent
    //           }
    //         ]
    //       }
  
    //     ]
    //   }


    {
      path : 'sitio-web',
      children: [
        {
          path : '',
          loadChildren : () => import('./ayuda/ayuda-routing.module').then(m => m.AyudaRoutingModule)
        },
        {
          path : '',
          loadChildren : () => import('./inicio/inicio-routing.module').then(m => m.InicioRoutingModule)
        },
        {
          path : '',
          loadChildren : () => import('./sobre-nosotros/sobre-nosotros-routing.module').then(m=> m.SobreNosotrosRouting)
        }
      ]
    }

];



@NgModule({
    imports:[RouterModule.forChild(routes),],
    exports:[RouterModule],
})

export class SitioWebRoutingModule{

}