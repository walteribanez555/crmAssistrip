
import { Component,OnInit } from '@angular/core';
import { Servicio } from 'src/app/models/Data/Servicio';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-listado-planes',
  templateUrl: './listado-planes.component.html',
  styleUrls: [
        
        '../../../css/tables.css'  
],
  
  
})
export class ListadoPlanesComponent implements OnInit {

  listado_Servicio: Servicio[] = [];

  showComponent = false;

  showDetails() {
    
    this.showComponent = !this.showComponent;
  }

  constructor(
      
      private servicios : ServiciosService
      ) {}



      ngOnInit(){
        this.servicios.getServicios().subscribe(
          (data)=> {
            this.listado_Servicio = data.filter(item => item.status === 1);
          })
      }

 

  



}
