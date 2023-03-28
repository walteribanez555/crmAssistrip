import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';

import { Catalogo } from 'src/app/models/Data/Catalogo';
import { Extra } from 'src/app/models/Data/Extra';
import { Precio } from 'src/app/models/Data/Precio';
import { Servicio } from 'src/app/models/Data/Servicio';
import { datesDestiny } from 'src/app/models/Pages/datesDestiny.model';

import { policie } from 'src/app/models/Pages/policie.model';
import { policiesForm } from 'src/app/models/Pages/policiesForm.model';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { ExtrasService } from 'src/app/services/extras.service';
import { PreciosService } from 'src/app/services/precios.service';
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
  listPolicies : policiesForm[] = [];
  precios : Precio[] = [];
  
  
  stepForm: number = 1;
  
  highestPostForm : number =1;

  

  
  constructor(
    
    private catalogoService : CatalogosService,
    private servicios : ServiciosService,
    private extras : ExtrasService,
    private preciosService : PreciosService,

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

    this.preciosService.getPrecios().subscribe(
      (data)=> {
        this.precios = data;
      }
    )


  }


  agregar(event : datesDestiny) {
    


    console.log("Hola");
    this.dataFormDestiny = event;


    this.diaViaje = this.dataFormDestiny.finalDate;

    this.comparar(this.dataFormDestiny.initialDate, this.dataFormDestiny.finalDate);
    
    this.finalTags = this.dataFormDestiny.tags.toString();
    
    this.stepForm +=1;



    this.getDestinys();

    
    

    


    if(this.stepForm> this.highestPostForm){
      this.highestPostForm = this.stepForm;
    }


    
    
 }  

 agregarPolizas(event : Event){
      this.stepForm +=1;
      console.log("Aumento");
 }



 
 comparar(initialDay : string, finalDay : string){
  const date1: Date = new Date(initialDay);
  const date2: Date = new Date(finalDay);

    // Get the difference in milliseconds
    const diffInMs = Math.abs(date2.getTime() - date1.getTime());

    // Convert the difference to days
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if(!isNaN(diffInDays)){
      this.diffDays= diffInDays;
    }

    this.diffDays = diffInDays;
 }
 
 

  onPressComponentPrevForm(){
    
    this.prevForm();
  }


  prevForm(){
    
  this.stepForm -=1;
  }


  getDestinys(){

     this.planesCubren = this.listadoPlanes.filter(plan => this.haveRequirements(plan) );
     this.planesCubren = this.planesCubren.filter(plan =>  this.haveRange(plan));
     

     

  }


  haveRequirements( plan : Servicio){
    
    if(!plan.disponibilidad){
      return false;
    }

    const countries : string [] = plan.disponibilidad.split(",");

    
    
  
    return   this.dataFormDestiny.tags.every((string) => countries.includes(string));
  }


  addPolicie( event : policiesForm){



    const existingElementIndex = this.listPolicies.findIndex( poliza => poliza.id === event.id);


    this.obtenerCostoPoliza(event);

    
    if (existingElementIndex !== -1) {
      this.listPolicies[existingElementIndex] = event;
    } else {
      this.listPolicies.push(event);
    }

    
    
    
  }


  deletePolicie( event : number){

    const elementIndex = this.listPolicies.findIndex(poliza => poliza.id === event);
    this.listPolicies.splice(elementIndex,1);
  }


  splitFirstWord(input: string) : {firsWord : string , resOfWord : string} {


    const inputNormalized:  string =  this.normalizeSpaces(input);

    const firstSpaceIndex = inputNormalized.indexOf(' ');
  
    if (firstSpaceIndex === -1) {
      // No hay espacios en el string, así que se devuelve el string en un array
      return {firsWord : input , resOfWord : ""};
    }
  
    const firstWord = inputNormalized.slice(0, firstSpaceIndex);
    const restOfString = inputNormalized.slice(firstSpaceIndex + 1);
  
    return {firsWord : firstWord , resOfWord : restOfString.trimEnd()}
  }
  

  normalizeSpaces(input: string): string {
    // Dividir el string en palabras, utilizando un espacio como separador
    const words = input.split(' ');
  
    // Filtrar palabras vacías (espacios adicionales)
    const nonEmptyWords = words.filter(word => word !== '');
  
    // Unir las palabras con un solo espacio entre ellas
    const normalizedString = nonEmptyWords.join(' ');
  
    return normalizedString;
  }


  obtenerCostoPoliza( poliza : policiesForm){


    const precios =  this.precios.find(precio => precio.servicio_id === poliza.poliza.itemForm.value.plan*1); 
    


    const rangoPrecio   = this.precios.find(precio => this.betweenTheRange(precio.limite_inferior, precio.limite_superior));

    
    console.log(rangoPrecio);
    
  }


  betweenTheRange( liInf: number, liSup: number ) : boolean{
    
    return this.diffDays >= liInf && this.diffDays <= liSup;
  }


  haveRange(servicio : Servicio):Boolean{
      

    // && precio.servicio_id*1 === servicio.servicio_id*1
      const haveArange : Precio[] =  this.precios.filter(precio => {
          if(this.betweenTheRange(precio.limite_inferior, precio.limite_superior)  && precio.servicio_id*1 === servicio.servicio_id*1){
            return true;
          }
          return false;

      }); 


      if(haveArange.length>0){
        
        return true
        

      }
      
  
      return false;
  }



  
}
