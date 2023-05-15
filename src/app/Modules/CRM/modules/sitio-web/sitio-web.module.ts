import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioModule } from './inicio/inicio.module';
import { AyudaModule } from './ayuda/ayuda.module';
import { SobreNosotrosModule } from './sobre-nosotros/sobre-nosotros.module';
import { SitioWebRoutingModule } from './sitio-web-routes.module';


@NgModule({
    declarations: [

    ],
    imports:[
        CommonModule,
        InicioModule,
        AyudaModule,
        SobreNosotrosModule,
        SitioWebRoutingModule
    ],
    exports:[
        
    ]

})
export class SitioWebModule{ }