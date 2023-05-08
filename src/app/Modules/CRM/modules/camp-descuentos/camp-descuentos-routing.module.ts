import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearCampComponent } from './crear-camp/crear-camp.component';
import { ListadoCampComponent } from './listado-camp/listado-camp.component';



const routes : Routes = [
    {
        path:'camp-descuentos',
        children:[
            
            {
                path: 'crear-camp',
                component: CrearCampComponent
            },
            {
                path: 'listado-camp',
                component : ListadoCampComponent
            }
        ]
    }
];




@NgModule({
    imports: [
      RouterModule.forChild(routes),
  
    ],
    exports: [RouterModule],
    
  })
  export class CampDescuentosRoutingModule{ 
      
  
   }