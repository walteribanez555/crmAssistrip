import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';

import { Catalogo } from 'src/app/models/Data/Catalogo';
import { Extra } from 'src/app/models/Data/Extra';
import { Servicio } from 'src/app/models/Data/Servicio';
import { datesDestiny } from 'src/app/models/Pages/datesDestiny.model';

import { policie } from 'src/app/models/Pages/policie.model';
import { policiesForm } from 'src/app/models/Pages/policiesForm.model';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { ExtrasService } from 'src/app/services/extras.service';
import { ServiciosService } from 'src/app/services/servicios.service';


// register Swiper custom elements


@Component({
  selector: 'app-generar-polizas',
  templateUrl: './generar-polizas.component.html',
  styleUrls: ['./generar-polizas.component.css']
})
export class GenerarPolizasComponent implements OnInit{


  
  nextId = 0;
  

  

  
  

  dataFormDestiny : datesDestiny = { 
    initialDate: '',
    finalDate : '',
    tags : []
  }


  finalTags : string = "";
  


  




  datos: any = {}


  extraList : Extra[]= [];


  diffDays = -1;
  paises : Catalogo[] =[];
  listadoPlanes : Servicio[] = [];
  planesCubren : Servicio[]= [];
  diaViaje : string = "";
  
  
  stepForm: number = 1;
  
  highestPostForm : number =1;

  

  
  constructor(
    
    private catalogoService : CatalogosService,
    private servicios : ServiciosService,
    private extras : ExtrasService

  ) {

   
   }

  ngOnInit(): void {
    
    this.catalogoService.getPaises().subscribe(
      (data)=> {
        this.paises = data.filter(item => item.status === 1);
      });

    this.servicios.getServicios().subscribe(
      (data)=> {
        this.listadoPlanes = data.filter(item => item.status === 1);
      });

    this.extras.getExtras().subscribe(
      (data)=> {
        this.extraList = data;
      }
    );


  }


  agregar(event : datesDestiny) {
    

    this.dataFormDestiny = event;

    this.getDestinys();

    this.diaViaje = this.dataFormDestiny.finalDate;
    
    this.finalTags = this.dataFormDestiny.tags.toString();
    
    this.stepForm +=1;


    if(this.stepForm> this.highestPostForm){
      this.highestPostForm = this.stepForm;
    }


    
    
 }  

 agregarPolizas(event : Event){
      this.stepForm +=1;
      console.log("Aumento");
 }



 

 
 

  onPressComponentPrevForm(){
    
    this.prevForm();
  }


  prevForm(){
    
  this.stepForm -=1;
  }


  getDestinys(){

     this.planesCubren = this.listadoPlanes.filter(plan => this.haveRequirements(plan) );

  }


  haveRequirements( plan : Servicio){
    
    if(!plan.disponibilidad){
      return false;
    }

    const countries : string [] = plan.disponibilidad.split(",");

    
    
  
    return   this.dataFormDestiny.tags.every((string) => countries.includes(string));
  }


  

  
}
