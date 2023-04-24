import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, filter, min, switchMap } from 'rxjs';
import { Catalogo } from 'src/app/models/Data/Catalogo';
import { Extra } from 'src/app/models/Data/Extra';
import { Plan } from 'src/app/models/Data/Plan';
import { Precio } from 'src/app/models/Data/Precio';
import { Servicio } from 'src/app/models/Data/Servicio';
import { cotizacionDataForm } from 'src/app/models/Pages/cotizacionDataForm.model';
import { datesDestiny } from 'src/app/models/Pages/datesDestiny.model';
import { FormCotizarModel } from 'src/app/models/Pages/formCotizar.model';
import { planDataForm } from 'src/app/models/Pages/planDataForm.model';
import { tipoBeneficio } from 'src/app/models/Pages/tipoBeneficio.model';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { cotizacionIntefaceService } from 'src/app/services/cotizacioninterface.service';
import { ExtrasService } from 'src/app/services/extras.service';
import { PlanesService } from 'src/app/services/planes.service';
import { PreciosService } from 'src/app/services/precios.service';
import { ServiciosService } from 'src/app/services/servicios.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { Location } from '@angular/common';

import Swal from 'sweetalert2';
import { planbeneficio } from 'src/app/models/Pages/planbeneficio.model';
import { catalogoBeneficio } from 'src/app/models/Pages/catalogoBeneficio.model';
import { BeneficiosService } from 'src/app/services/beneficios.service';
import { Beneficio } from 'src/app/models/Data/Beneficio';
import { catalogoBeneficioData } from 'src/app/models/Pages/catalogoBeneficioData.model';
import { ExtraForm } from 'src/app/models/Pages/extra.model';

@Component({
  selector: 'app-cotizar',
  templateUrl: './cotizar.component.html',
  styleUrls: ['./cotizar.component.css']
})
export class CotizarComponent implements OnInit{

    tags: string[] = [];


    listTags : string = "";

    ageListShow = false;
    inputValue: string ="";
    listCotizaciones : cotizacionDataForm[] = [];

    cotizaciones : cotizacionDataForm[] = [];
    cotizacionesMayores : cotizacionDataForm[] = [];

    


  receivedData: FormCotizarModel= {
    initialDate: '',
    finalDate: '',
    tags: [],
    origen: '',
    listCotizaciones : [],
    email: '',
    telefono: '',

  };

  formData = {
    initialDate: '25/05/2002',
    finalDate: '',
    inputValue : '',
    origen : '',
    email : '',
    telefono : '',
    
  };


  private startY = 0;
  private startHeight = 0;
  public itemHeight = 150;
  public maxHeightReached = false;
  public maxHeight = 300;
  public minHeight = 150;
  public minHeightReached = true;
  nextId : number = 0;
  isOld = false;

  diffDays : number = 0;


  paises : Catalogo[] =[];
  beneficiosData: Catalogo[] = [];
  listadoPlanes : Servicio[] = [];
  planesCubren : Servicio[]= [];
  diaViaje : string = "";
  inicioViaje : string ="";
  precios : Precio[] = [];
  extraList : Extra[]= [];
  beneficiosList : Plan[] = [];
  listPlanes : planDataForm[] = [];

  listDataBeneficios : tipoBeneficio[]= [];

  listadoPlanBeneficio : planbeneficio[] = [];



  listadoMenor: planbeneficio[] = [];
  listadoMayor : planbeneficio[] = [];

  listBeneficios : Beneficio[] = [];


  listBeneficiosCat : catalogoBeneficioData[] = []; 

  listExtras : Extra[] = [];


  cardExtras : ExtraForm[] =[];


  minPlanes : number = 1;
  
  servicioMayores : Servicio | null = null;
  servicioMenores : Servicio | null = null;


  listData: any[]= [];


  btn_pagar = false;


  
  
 


  stateBottom : 1| 2 | 3 = 1;
  

  constructor(
      private dataService: cotizacionIntefaceService,
      private router : Router,
      private catalogoService : CatalogosService,
      private servicios : ServiciosService,
      private extras : ExtrasService,
      private preciosService : PreciosService,
      private planesService : PlanesService,
      private beneficioService :BeneficiosService,
      private extraService  : ExtrasService,
      private location: Location

    ) {}

  ngOnInit() {

    Swal.fire({
      
      text: 'Espere un momento mientras se procesa la informacion',
      imageUrl: 'https://cdn.pixabay.com/animation/2022/10/11/03/16/03-16-39-160_512.gif',
      
      showConfirmButton : false,
      allowOutsideClick: false,
      
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: 'Custom image',
    })

    if(this.dataService.sharedData.listCotizaciones.length === 0){
      Swal.close();
      this.router.navigate(['/home']);
    }

    this.receivedData = this.dataService.sharedData;

    
   

    this.remplazarData(this.receivedData);

    this.servicios.getServicios().pipe(
      switchMap(data => {
        const listData = data.filter(item => item.status === 1);
        this.listadoPlanes= listData;
        return this.extras.getExtras();
      }),
      switchMap(data => {
        this.extraList = data;
        return this.preciosService.getPrecios();
      }),
      switchMap(data => {
        this.precios = data;
        return this.beneficioService.getBeneficios();
      }),
      switchMap(data=> { 
        this.listBeneficios = data;
        return this.extraService.getExtras();

      }), 

      switchMap(data => {
        this.listExtras = data;

        
        return this.catalogoService.getPaises();
      }),
      switchMap(data=> {
        this.paises = data.filter(item => item.status === 1);
        return this.catalogoService.getBeneficios();
      })
    ).subscribe(
      (data)=> {
          this.beneficiosData = data.filter(item => item.status === 1);
          this.listBeneficiosCat = this.mapListBeneficioCat(this.listBeneficios);




          const requests : any[]  = [];
          this.listadoPlanes.forEach(plan => {
            requests.push(plan.servicio_id);
          });

          //Convertir response a un listado con un nombre y su sub hijo
          forkJoin(
            requests.map((request) =>
              this.planesService.getPlanById(request).pipe(

                map((response) =>{

                  this.cardExtras= this.showExtras()

                  

                  return ({
                    serv :  this.listadoPlanes.find(plan => plan.servicio_id === request)? this.listadoPlanes.find(plan => plan.servicio_id === request) : null,
                    beneficios:  this.mapListBeneficio(response)
                  })
                } )
              )
            )
          ).subscribe(
            (response) => {

              this.listData = response;
              
              this.cotizar();
              // this.listadoPlanBeneficio = response;
              

              Swal.close();

            },
            (error) => {
              Swal.close();
              this.errorMessage();
              console.error(error);
            }
            
          );



          

          
      }
    
  
    );

  }




  errorMessage(){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
    });
  }

  

  showExtras(): ExtraForm[]{
    const extrasFiltered : ExtraForm[] = this.listExtras.map((extra,index) => {
      return {
        id : index,
        extra,
        checked : false
      }
    });


    return extrasFiltered


  }
  
  


  remplazarData(data: FormCotizarModel){


    


    this.formData.initialDate = data.initialDate;
    this.formData.finalDate = data.finalDate;
    this.formData.origen = data.origen;
    this.formData.email = data.email;
    this.formData.telefono = data.telefono;
    this.tags = data.tags;
    this.listCotizaciones = data.listCotizaciones;
    this.listTags = this.tags.join(', ');
    this.diffDays =this.comparar();

    this.nextId = this.listCotizaciones.length;


  }



   mapListBeneficio(listPlan : Plan[]){

    const listCatBeneficio : catalogoBeneficio[] = [];
    this.beneficiosData.forEach(beneficio=> {
      const planesByBeneficio : Plan[] = listPlan.filter( plan => plan.tipo_beneficio === beneficio.valor);
      const catyBeneficio = {
        tipo_beneficio : beneficio,
        beneficios :  planesByBeneficio,
        isSubDropdownOpen: false,
      }


      listCatBeneficio.push(catyBeneficio);



    })

   

    return listCatBeneficio

   }

   mapListBeneficioCat(listBeneficios : Beneficio[]){
      const listCatBeneficio : catalogoBeneficioData[] = [];
      this.beneficiosData.forEach(cat=> {
        const catbyBeneficio : Beneficio[] = listBeneficios.filter( beneficio => beneficio.tipo_beneficio === cat.valor);
        const catyBeneficio = {
          tipo_beneficio : cat,
          beneficios :  catbyBeneficio,
          subDropdownOpen: false,
        }
  
  
        listCatBeneficio.push(catyBeneficio);
  
  
  
      })


    
      return listCatBeneficio

   }
  
  


  expand(){
    if(this.minHeightReached){
      
      this.itemHeight = this.maxHeight;
    }
    else{
      this.itemHeight = this.minHeight;
      
    }
    this.minHeightReached = !this.minHeightReached;

    

  }
  reducir(){
   this.itemHeight = this.minHeight;
   this.minHeightReached= true;
  }

  salir(){
    this.router.navigate(['/home']);
  }

  
  onTouchStart(event: TouchEvent) {
    // Record the initial touch position and height of the element
    this.startY = event.touches[0].clientY;
    this.startHeight = this.itemHeight;
  }

  
  onTouchMove(event: TouchEvent) {
    this.minHeightReached = false;
    // Calculate the distance between the initial touch position and the current touch position
    const deltaY = event.touches[0].clientY - this.startY;

    // Calculate the new height of the element based on the distance and direction of the drag
    let newHeight = this.startHeight - deltaY;
    newHeight = Math.max(this.minHeight, Math.min(newHeight, this.maxHeight));


    // Update the height of the element
    this.itemHeight = newHeight;
    this.maxHeightReached = newHeight === this.maxHeight;
    this.minHeightReached = newHeight === this.minHeight;
  }


  onTouchEnd(event: TouchEvent) {
    // Clear the initial touch position and height of the element
    this.startY = 0;
    this.startHeight = 0;
  }

  remove(tag: string) {
    let index = this.tags.indexOf(tag);
    this.tags = [...this.tags.slice(0, index), ...this.tags.slice(index + 1)];

    const data : datesDestiny = { 
      initialDate : this.formData.initialDate,
      finalDate : this.formData.finalDate,
      tags : this.tags}
    // this.modifyTags.emit(data);

    this.listTags = this.tags.join(', ');
    
    
  }

  addTag(event: any) {
    if (event.key === 'Enter') {
      let tag = event.target.value.replace(/\s+/g, ' ');
      this.insertTag(tag);
      event.target.value = '';
    }

    

  }

  insertTag(tag: string) {
    if(tag!=="pais"){

      if (tag.length > 1 && !this.tags.includes(tag)) {
        
          tag.split(',').forEach(tag => {
            this.tags.push(tag);
          });
        
      }

      this.listTags = this.tags.join(', ');
      console.log(this.listTags);
    }
  }
  


  onSelect(event: Event) {
    const target = event.target as HTMLSelectElement;
    if (target) {
      if (target.value === 'pais') {
        return;
      }
      const selectedValue = target.value;
      this.insertTag(selectedValue);

      target.value = "pais";
      this.formData.inputValue = 'pais';


      
      
      
      // Do something with the selected value here
    }
  
  }


  toggleListAge(){
    this.ageListShow = !this.ageListShow;
  }


  createItemForm(): FormGroup{
    return new FormGroup({
      age: new FormControl(''),
      
    });
  }

  addItem(){
    
    const cotizacionfrm : cotizacionDataForm ={ 
      id :this.nextId++,
      age: 0,
      item : this.createItemForm()
    }

    


    this.listCotizaciones.push(cotizacionfrm);

  }


  deleteItem(item: cotizacionDataForm) {
    const index = this.listCotizaciones.findIndex(i => i.id === item.id);
    if (index !== -1) {
      
      this.listCotizaciones.splice(index, 1);
    }
  }

  changeAgeInpt(event: any, item: cotizacionDataForm) {
    
    const index = this.listCotizaciones.findIndex(i => i.id === item.id);
    if (index !== -1) {
      this.listCotizaciones[index].age = event.target.value;
      
    }

    
  }


  backHome(){
    const data: FormCotizarModel = {
      initialDate : this.formData.initialDate,
      finalDate : this.formData.finalDate,
      origen : this.formData.origen,
      email : this.formData.email,
      telefono : this.formData.telefono,
      tags : this.tags,
      listCotizaciones : this.listCotizaciones
    }
    this.dataService.sharedData= data;
    this.router.navigate(['/home']);
  }


  agregar(event: any) { 
    
  }
  

  comparar(){
    const date1: Date = new Date(this.formData.initialDate);
    const date2: Date = new Date(this.formData.finalDate);


    
  
      // Get the difference in milliseconds
      const diffInMs = Math.abs(date2.getTime() - date1.getTime());
  
      // Convert the difference to days
      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
      if(!isNaN(diffInDays)){
        return diffInDays+1;
        
      }
      return -1;
   }



   btnCotizar(){
    Swal.fire({
      title: 'Cotizando',
      text: 'Espere un momento por favor',
      icon: 'info',
      allowOutsideClick: false
    });
    this.cotizar();

    Swal.close();
   }

   cotizar(){
    this.minPlanes = 1;

     this.planesCubren = this.listadoPlanes.filter(plan => this.haveRequirements(plan) );
     this.planesCubren = this.planesCubren.filter(plan =>  this.haveRange(plan));

     this.DivideByAge();


     this.listadoPlanBeneficio = this.listData.filter(item => this.planesCubren.some(plan => plan.servicio_id === item.serv?.servicio_id)).map(
      item => {
        return {
          serv : item.serv? item.serv : null,
          beneficios : item.beneficios,
          isDropdownOpen: false,
        }
      }
    );



    this.listadoMayor = this.listadoPlanBeneficio.filter(plan => plan.serv && plan.serv?.edad_base=== 75);
    this.listadoMenor = this.listadoPlanBeneficio.filter(plan => plan.serv && plan.serv?.edad_limite=== 75);


     

   }

   haveRequirements( plan : Servicio){
    
    if(!plan.disponibilidad){
      return false;
    }

    const countries : string [] = plan.disponibilidad.split(",");

    
    
  
    return   this.tags.every((string) => countries.includes(string));
  }


  DivideByAge(){
    this.cotizaciones = [];
    this.cotizacionesMayores = [];


    this.listCotizaciones.forEach(cotizacion => {
      if(cotizacion.age<75){
        this.cotizaciones.push(cotizacion);
      }else{
        this.cotizacionesMayores.push(cotizacion);
      }
    });

    if(this.cotizacionesMayores.length> 0) { 
      this.minPlanes++;
    }
  }

  haveRange(servicio : Servicio):Boolean{
    const dias : number = this.diffDays;
      const haveArange : Precio[] =  this.precios.filter(precio => {
          if(this.betweenTheRange(precio.limite_inferior, precio.limite_superior ,dias)  && precio.servicio_id*1 === servicio.servicio_id*1){
            return true;
          }
          return false;

      }); 


      if(haveArange.length>0){
        
        return true
        

      }
      
  
      return false;
  }

  betweenTheRange( liInf: number, liSup: number, diffd : number ) : boolean{
    return diffd >= liInf && diffd <= liSup;
  }



  toggleListPlanBtn(state:  boolean){
    this.isOld = state;
  }


  toggleListPlan(servicio : Servicio)
  {

    if(servicio.edad_base===75){
        if(this.minPlanes>1){
          this.servicioMayores = servicio;
        }
    }else{
      console.log("menores");
      this.servicioMenores = servicio;
    }


    if(this.minPlanes>1){
      if( this.servicioMayores && this.servicioMenores){
        this.btn_pagar = true;
      }
    }else{
      if(this.servicioMenores){
        this.btn_pagar = true;
      }
    }


    console.log(this.servicioMenores);
    console.log(this.servicioMayores);
    
  }


  toggleDetails(plan :planbeneficio ){

    plan.isDropdownOpen = !plan.isDropdownOpen;

  }


  toggleBeneficioDetails(plan : planbeneficio, beneficio : catalogoBeneficio){

    const index = plan.beneficios.findIndex(b => b.tipo_beneficio.catalogo_id=== beneficio.tipo_beneficio.catalogo_id);
    if (index !== -1) {
      plan.beneficios[index].isSubDropdownOpen= !plan.beneficios[index].isSubDropdownOpen;
    }
    
  }
   

   reloadData(){
    const cotizarForm : FormCotizarModel = {
      initialDate: this.formData.initialDate,
      finalDate: this.formData.finalDate,
      origen : this.formData.origen,
      email : this.formData.email,
      telefono : this.formData.telefono,
      listCotizaciones : this.listCotizaciones,
      tags : this.tags
    }


    this.dataService.sharedData = cotizarForm;

    this.ngOnInit();
    
      
   }


   siguiente(){
    if(this.minPlanes>1){
      if( this.servicioMayores && this.servicioMenores){
        this.guardarData();
        this.router.navigate(['datos-polizas']);
      }
      else{
        console.log("No pasa, faltan el adulto mayor");
      }
   }else{
    if(this.servicioMenores){
      this.guardarData();
      this.router.navigate(['datos-polizas']);
    }else{
      console.log("No pasa, faltan los menores");
    }
    
   }
  }


  guardarData(){
    this.dataService.servicioMayores = this.servicioMayores;
    this.dataService.servicioMenores = this.servicioMenores;

    this.dataService.cotizacionMayores = this.cotizacionesMayores;
    this.dataService.cotizacionMenores = this.cotizaciones;
    this.dataService.listExtras = this.cardExtras.filter(extra => extra.checked);

  }

  toggleExtra( extra  : ExtraForm ){
    extra.checked = !extra.checked;
  }
  
}
