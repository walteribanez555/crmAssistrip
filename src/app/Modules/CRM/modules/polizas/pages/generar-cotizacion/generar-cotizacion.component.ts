import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Catalogo } from 'src/app/Modules/shared/models/Data/Catalogo';
import { ClientePost, ClienteResp } from 'src/app/Modules/shared/models/Data/Cliente';
import { Extra } from 'src/app/Modules/shared/models/Data/Extra';
import { PolizaResp } from 'src/app/Modules/shared/models/Data/Poliza';
import { Precio } from 'src/app/Modules/shared/models/Data/Precio';
import { Servicio } from 'src/app/Modules/shared/models/Data/Servicio';
import { Venta } from 'src/app/Modules/shared/models/Data/Venta.model';
import { cotizacionForm } from 'src/app/Modules/shared/models/Pages/cotizacionForm.model';
import { datesDestiny } from 'src/app/Modules/shared/models/Pages/datesDestiny.model';
import { extraCostForm } from 'src/app/Modules/shared/models/Pages/extasForm.model';
import { ExtraForm } from 'src/app/Modules/shared/models/Pages/extra.model';
import { policiesData } from 'src/app/Modules/shared/models/Pages/policiesData.model';
import { GetLocationService } from 'src/app/Modules/shared/services/get-location.service';
import { BeneficiariosService } from 'src/app/Modules/shared/services/requests/beneficiarios.service';
import { ExtrasPolizasService } from 'src/app/Modules/shared/services/requests/beneficiosExtras.service';
import { CatalogosService } from 'src/app/Modules/shared/services/requests/catalogos.service';
import { ClientesService } from 'src/app/Modules/shared/services/requests/clientes.service';
import { ExtrasService } from 'src/app/Modules/shared/services/requests/extras.service';
import { PolizasService } from 'src/app/Modules/shared/services/requests/polizas.service';
import { PreciosService } from 'src/app/Modules/shared/services/requests/precios.service';
import { ServiciosService } from 'src/app/Modules/shared/services/requests/servicios.service';
import { VentasService } from 'src/app/Modules/shared/services/requests/ventas.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-generar-cotizacion',
  templateUrl: './generar-cotizacion.component.html',
  styleUrls: ['./generar-cotizacion.component.css']
})
export class GenerarCotizacionComponent implements OnInit {


  stepForm  :number = 1;


  tags: string[] = [];
  finalTags: string = "";
  diffDays = -1;
  paises : Catalogo[] =[];




  inputValue: string ="";


  
  dataFormDestiny : datesDestiny = { 
    initialDate: '',
    finalDate : '',
    tags : []
  }



  
  locationCountry : string ="";
  listadoPlanes : Servicio[] = [];
  planesCubren : Servicio[]= [];
  diaViaje : string = "";
  inicioViaje : string ="";
  listPolicies : cotizacionForm[] = [];
  listPoliciesData : policiesData[] = [];
  precios : Precio[] = [];
  extraList : Extra[]= [];
  cliente = {
    nombre: "",
    apellido: "",
    nit  : "",
    telf : "",
    origen : "",
    email : ""
  
  };
  
  highestPostForm : number =1;


  



  

  loadDataCatalogo = false;
  loadDataServicios = false;


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
  ){

  }

  prevForm(){
    
    this.stepForm -=1;
    }

  ngOnInit(): void {

    Swal.fire({
      
      text: 'Espere un momento mientras se procesa la informacion',
      imageUrl: 'https://cdn.pixabay.com/animation/2022/10/11/03/16/03-16-39-160_512.gif',
      
      showConfirmButton : false,
      
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: 'Custom image',
    })
    
   

   
    this.catalogoService.getPaises().subscribe(
      (data)=> {
        
        this.paises = data.filter(item => item.status === 1);
        this.loadDataCatalogo = true

        
      });

    this.servicios.getServicios().subscribe(
      (data)=> {
        

        this.listadoPlanes = data.filter(item => item.status === 1);
        this.loadDataServicios = true
        Swal.close();
        
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






  


   
  

  

  



  errorMessage(errorMsg : string){

    Swal.fire({
      title: 'Error',
      text: errorMsg,
      icon : 'error',
      confirmButtonText: 'Continuar'
    })

  }

  nextStep(){
    this.stepForm +=1;
    console.log(this.stepForm);

    if(this.stepForm> this.highestPostForm){
      this.highestPostForm = this.stepForm;
    }
  }

  comprobarDatos( formData : datesDestiny){

      this.dataFormDestiny = formData;


      this.diaViaje = this.dataFormDestiny.finalDate;

      this.inicioViaje = this.dataFormDestiny.initialDate;

      this.comparar(this.dataFormDestiny.initialDate, this.dataFormDestiny.finalDate);
      
      this.finalTags = this.dataFormDestiny.tags.toString();
      
      



      this.getDestinys();
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
   getDestinys(){

    this.planesCubren = this.listadoPlanes.filter(plan => this.haveRequirements(plan) );
    this.planesCubren = this.planesCubren.filter(plan =>  this.haveRange(plan));

    console.log(this.planesCubren.length);
    
   if(!(this.planesCubren.length>0)){
     
     Swal.fire({
       title: 'Warning',
       text: 'No hay planes para esos destinos en conjunto',
       icon : 'warning',
       confirmButtonText: 'Cool'
     })
   }
    

 }
   

  
  haveRequirements( plan : Servicio){
      
    if(!plan.disponibilidad){
      return false;
    }

    const countries : string [] = plan.disponibilidad.split(",");

    
    

    return   this.dataFormDestiny.tags.every((string) => countries.includes(string));
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
  betweenTheRange( liInf: number, liSup: number ) : boolean{
    
    return this.diffDays >= liInf && this.diffDays <= liSup;
  }

  addPolicie( event : cotizacionForm){

    

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




  obtenerCostoPoliza( poliza : cotizacionForm){


    const rangoPrecio =  this.precios.find(precio => precio.servicio_id === poliza.itemForm.value.plan*1  && this.betweenTheRange(precio.limite_inferior, precio.limite_superior)); 
    

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


  getListCost(policie : cotizacionForm) : extraCostForm[]{

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

  guardarVenta(){

    Swal.fire({
      
      text: 'Espere un momento mientras se procesa la informacion',
      imageUrl: 'https://cdn.pixabay.com/animation/2022/10/11/03/16/03-16-39-160_512.gif',
      
      showConfirmButton : false,
      
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: 'Custom image',
    })

    let proceso_Finalizado   = false;

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
          
          this.errorMessage("Email no encontrado");
        }else { 

          const costoPolizaTotal : number = this.listPoliciesData.reduce((acc,policie) => acc + policie.costoTotal,0 )

          this.ventaService.postVenta(clientedata.id,this.listPolicies.length,0,this.inicioViaje, this.diaViaje, costoPolizaTotal).subscribe(
            (ventaData : Venta)=> {
             
              this.listPolicies.forEach((policie) => {
                const cantidadExtra : number = policie.listExtras.filter(extra=> extra.checked).length;
                this.polizasService.postPolizas(ventaData.id,policie.itemForm.value.plan,this.finalTags,this.inicioViaje,this.diaViaje,cantidadExtra).
                subscribe(
                  (response : PolizaResp)=> {
                    
                    const elementIndex = this.listPolicies.findIndex(poliza => poliza.id === policie.id);

                    const policieExtras : extraCostForm[]  = this.listPoliciesData[elementIndex].extras

                    policieExtras.forEach(extra => { 
                      this.extrasPolizas.postPolizaExtra(response.id,extra.idExtra,extra.costroExtra)
                      .subscribe(
                        response => {
                          
                          
                        }
                      )
                      
                    });

                    

                   const fechaVuelta = new Date(this.diaViaje);

                

                    this.beneficiarioService.postBeneficiario(
                      response.id,
                      "",
                      "",
                      "",
                      "",
                      "1",
                      "1",
                      this.getTheBirthday(policie.age, fechaVuelta).toString(),
                      "1",
                      "1", 
                      "1", 
                      "1")
                      .subscribe(
                        (response)=> {
                          console.log(response);
                          proceso_Finalizado = true;
                        }
                      )

                  }
                )

                this.successMessage(`Cotizacion realizada correctamente`);

              })


            }

          )
        }

      },
      (error) => {
        this.errorMessage(error);
      }


      

      



    )

      
    
    


    
  }


  getTheBirthday(edad : number , diaFinalViaje : Date ){ 
    const originalYear = diaFinalViaje.getUTCFullYear();
    const originalMonth = diaFinalViaje.getUTCMonth();
    const originalDay = diaFinalViaje.getUTCDate();


    const subtractedYear = originalYear - edad;


    return subtractedYear
   }


   successMessage(msg : string){
    Swal.close();
    Swal.fire({
      title: 'Venta registrada correctamente',
      icon:  'success',
      text: msg
    })
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


}



