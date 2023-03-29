import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';

import { Catalogo } from 'src/app/models/Data/Catalogo';
import { Cliente, ClientePost, ClienteResp } from 'src/app/models/Data/Cliente';
import { Extra } from 'src/app/models/Data/Extra';
import { Precio } from 'src/app/models/Data/Precio';
import { Servicio } from 'src/app/models/Data/Servicio';
import { datesDestiny } from 'src/app/models/Pages/datesDestiny.model';
import { extraCostForm} from 'src/app/models/Pages/extasForm.model';
import { ExtraForm } from 'src/app/models/Pages/extra.model';
import { policiesData } from 'src/app/models/Pages/policiesData.model';
import {HttpErrorResponse} from '@angular/common/http';
import { policiesForm } from 'src/app/models/Pages/policiesForm.model';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { ClientesService } from 'src/app/services/clientes.service';
import { ExtrasService } from 'src/app/services/extras.service';
import { GetLocationService } from 'src/app/services/get-location.service';
import { PreciosService } from 'src/app/services/precios.service';
import { ServiciosService } from 'src/app/services/servicios.service';
import { switchMap } from 'rxjs/operators';
import { VentasService } from 'src/app/services/ventas.service';
import { PolizasService } from 'src/app/services/polizas.service';
import { Venta } from 'src/app/models/Data/Venta.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { policie } from 'src/app/models/Pages/policie.model';
import { Poliza, PolizaResp } from 'src/app/models/Data/Poliza';
import { ExtrasPolizasService } from 'src/app/services/beneficiosExtras.service';
import { BeneficiariosService } from 'src/app/services/beneficiarios.service';

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
  inicioViaje : string ="";
  listPolicies : policiesForm[] = [];
  listPoliciesData : policiesData[] = [];
  precios : Precio[] = [];
  latitude :number =0;
  longitude : number =0;
  locationCountry : string = "";
  cliente = {
    nombre: "",
    apellido: "",
    nit  : "",
    telf : "",
    origen : "",
    email : ""
  
  };
  

  
  stepForm: number = 1;
  
  highestPostForm : number =1;

  

  

  
  constructor(
    
    private catalogoService : CatalogosService,
    private servicios : ServiciosService,
    private extras : ExtrasService,
    private preciosService : PreciosService,
    private location : GetLocationService,
    private clienteservice : ClientesService,
    private ventaService : VentasService,
    private polizasService : PolizasService,
    private extrasPolizas : ExtrasPolizasService,
    private beneficiarioService : BeneficiariosService,

  ) 
  {

   
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
    );

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        
      

        this.location.getLocation(position.coords.latitude, position.coords.longitude).subscribe(
          (data)=> {
            
            const features = data as { features: any[] };
            console.log(features.features);
            const country = features.features[0].text;
            this.locationCountry = country;
          }
        );
      });

      

      

    } else {
      console.log('Geolocation is not supported by this browser.');
    }

    


  }


  agregar(event : datesDestiny) {
    


    
    this.dataFormDestiny = event;


    this.diaViaje = this.dataFormDestiny.finalDate;

    this.inicioViaje = this.dataFormDestiny.initialDate;

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

      if(this.stepForm> this.highestPostForm){
        this.highestPostForm = this.stepForm;
      }
      
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


    const listCostExtras : extraCostForm[] = this.getListCost(event);

    const existingElementDataIndex = this.listPoliciesData.findIndex( poliza => poliza.id === event.id);
    const costoPoliza = this.obtenerCostoPoliza(event);
    const costoTotal : number =  costoPoliza + listCostExtras.reduce((acc, curr)=> acc+curr.costroExtra,0)
    if(existingElementDataIndex!==-1){
      this.listPoliciesData[existingElementDataIndex] ={
        id : event.id,
        costoTotal : costoTotal,
        costoPoliza : costoPoliza,
        extras : listCostExtras
      };


    }else{
      this.listPoliciesData.push({
        id : event.id,
        costoTotal : costoTotal,
        costoPoliza : costoPoliza,
        extras : listCostExtras
      })
    }


      

      

    
    
    
  }


  deletePolicie( event : number){


    const elementIndex = this.listPolicies.findIndex(poliza => poliza.id === event);
    if(elementIndex !== -1){
      this.listPolicies.splice(elementIndex,1);
      this.listPoliciesData.splice(elementIndex,1);
    }
    
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


    const rangoPrecio =  this.precios.find(precio => precio.servicio_id === poliza.poliza.itemForm.value.plan*1  && this.betweenTheRange(precio.limite_inferior, precio.limite_superior)); 
    

    if(rangoPrecio){
      return this.realizarCalculo(rangoPrecio) ;
    }


    return 0;

    

    
    
    
  }




  realizarCalculo(rangoPrecio : Precio){
    let precio :number = 0;
    if(rangoPrecio.tipo_ecuacion ===1){
      precio=this.ecuacionCurva(rangoPrecio, this.diffDays) * this.diffDays;
    }
    if(rangoPrecio.tipo_ecuacion ===2){
      precio = this.ecuacionRecta(rangoPrecio, this.diffDays) *this.diffDays;
    }

    return precio;

  }


  ecuacionCurva(rangoPrecio : Precio, dias : number){
    const valor = Math.pow(dias, rangoPrecio.intercepto)
    return valor*rangoPrecio.pendiente;

  }


  ecuacionRecta( rangoPrecio : Precio, dias: number){
      
      
  
      const valor = (rangoPrecio.pendiente*dias) + rangoPrecio.intercepto;
  
      return valor;
  
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


  getListCost(policie : policiesForm) : extraCostForm[]{

      const listExtras : ExtraForm[] = policie.listExtras.filter(extra => extra.checked);

      

      const listCostExtras : extraCostForm[] = listExtras.map(extrafrm => {

        
        if(extrafrm.extra.complemento){



          const dataExtra : extraCostForm = { 

            idExtra: extrafrm.extra.beneficio_id,
            costroExtra : parseFloat(extrafrm.extra.complemento)*this.diffDays,
            
          }

          return dataExtra;
          
        }

        const dataExtra: extraCostForm = {
          idExtra : 0,
          costroExtra : 0,
        };
          return  dataExtra;
        
        

       });


       return listCostExtras;
  }

  loadFormCliente(event : FormGroup){
    this.cliente = {
      nombre : event.value.nombre,
      apellido : event.value.apellido,
      nit : event.value.nit,
      telf : event.value.telf,
      email : event.value.email,
      origen : event.value.origen
    }


    this.stepForm +=1;

      if(this.stepForm> this.highestPostForm){
        this.highestPostForm = this.stepForm;
      }
  }


  guardarVenta(){
    

    const clienteDatos : ClientePost = { 
      nombre : this.normalizeSpaces(this.cliente.nombre),
      apellido : this.normalizeSpaces(this.cliente.apellido),
      email : this.cliente.email,
      nro_contacto :this.cliente.telf,
      origen : this.cliente.origen,
      nit_ci : this.cliente.nit
    }


    // Make the HTTP post request
    this.clienteservice.postCliente(clienteDatos)
    .subscribe(
      (clientedata : ClienteResp)=>{
        
        
        
        if(!clientedata.id){
          console.log("Email Repetido");
        }else { 

          const costoPolizaTotal : number = this.listPoliciesData.reduce((acc,policie) => acc + policie.costoTotal,0 )

          this.ventaService.postVenta(clientedata.id,this.listPolicies.length,0,this.inicioViaje, this.diaViaje, costoPolizaTotal).subscribe(
            (ventaData : Venta)=> {
             
              this.listPolicies.forEach((policie) => {
                const cantidadExtra : number = policie.listExtras.filter(extra=> extra.checked).length;
                this.polizasService.postPolizas(ventaData.id,policie.poliza.itemForm.value.plan,this.finalTags,this.inicioViaje,this.diaViaje,cantidadExtra).
                subscribe(
                  (response : PolizaResp)=> {
                    
                    const elementIndex = this.listPolicies.findIndex(poliza => poliza.id === policie.id);

                    const policieExtras : extraCostForm[]  = this.listPoliciesData[elementIndex].extras

                    policieExtras.forEach(extra => { 
                      this.extrasPolizas.postPolizaExtra(response.id,extra.idExtra,extra.costroExtra)
                      .subscribe(
                        response => {
                          console.log(response);
                        }
                      )
                      
                    });

                    const names = this.splitFirstWord(policie.poliza.itemForm.value.name);

                    const firstName = names.firsWord;
                    const secondName= names.resOfWord;
                    
                   const lastNames= this.splitFirstWord(policie.poliza.itemForm.value.lastName);

                   const firtLastName = lastNames.firsWord;
                   const seconLastName = lastNames.resOfWord;

                

                    this.beneficiarioService.postBeneficiario(
                      response.id,
                      firtLastName,
                      seconLastName,
                      firstName,
                      secondName,
                      policie.poliza.itemForm.value.ci,
                      policie.poliza.itemForm.value.passport,
                      policie.poliza.itemForm.value.birthday,
                      policie.poliza.itemForm.value.gender,
                      policie.poliza.itemForm.value.nationality, 
                      policie.poliza.itemForm.value.email, 
                      policie.poliza.itemForm.value.phone)
                      .subscribe(
                        (response)=> {
                          console.log(response);
                        }
                      )

                  }
                )



              })


            }

          )
        }

      },
      (error) => {
        console.log("Hay un error");
      }



    )


    // this.clienteservice.postCliente(clienteDatos).subscribe(
    //   (cliente : ClienteResp)=> {
    //     if(!cliente.nombre){
    //       console.log("Ya existe el usuario");
    //     }
    //   }

      
      // (cliente : ClienteResp) => {

      //   console.log(cliente);
        

      //   // return this.ventaService.postVenta(cliente.cliente_id,this.listPolicies.length,0,this.inicioViaje, this.diaViaje)
  
        
      // }
    // ).subscribe( ( response : Venta) => { 

    //   const venta_id = response.id;

    //   this.listPolicies.forEach( policie => {

    //     const elementIndex = this.listPoliciesData.findIndex(poliza => poliza.id === policie.id );
    //     this.polizasService.postPolizas(venta_id,policie.poliza.itemForm.value.plan,this.finalTags,this.inicioViaje,this.diaViaje, this.listPoliciesData[elementIndex].extras.length )
        
    //   }   
    //   );
    // }, error => {
    //   console.error(error);
    // });
    

    
    
  }



  acumularTotal(listpolicies : policiesData[]){
    const total = listpolicies.reduce((acc, rec)=>acc+rec.costoTotal,0);
   

    return total.toFixed(2);

  }


  mapearPoliza(){

  }
  
}
