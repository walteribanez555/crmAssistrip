import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {  Router } from '@angular/router';
import { Catalogo } from 'src/app/models/Data/Catalogo';
import { cotizacionDataForm } from 'src/app/models/Pages/cotizacionDataForm.model';
import { datesDestiny } from 'src/app/models/Pages/datesDestiny.model';
import { CatalogosService } from 'src/app/services/catalogos.service';
import { cotizacionIntefaceService } from 'src/app/services/cotizacioninterface.service';
import { FormCotizarModel } from 'src/app/models/Pages/formCotizar.model';

@Component({
  selector: 'app-data-cotizador',
  templateUrl: './data-cotizador.component.html',
  styleUrls: ['./data-cotizador.component.css']
})
export class DataCotizadorComponent implements OnInit {

  tags: string[] = [];
  paises : Catalogo[] =[];
  inputValue: string ="";
  listCotizaciones : cotizacionDataForm[] = [];
  seeAges: boolean = false;
  

  nextId : number = 0;

  formData = {
    initialDate: '',
    finalDate: '',
    origen : '',
    email : '',
    telefono : '',
  };

  receivedData: FormCotizarModel= {
    initialDate: '',
    finalDate: '',
    tags: [],
    origen: '',
    listCotizaciones : [],
    email: '',
    telefono: '',

  };

  
  diffDays = -1;


  constructor(
    private catalogoService : CatalogosService,
    private router : Router,
    private dataService: cotizacionIntefaceService
  ){

  }
  

  ngOnInit(): void {

    this.catalogoService.getPaises().subscribe(
      (data)=> {  
        this.paises = data.filter(item => item.status === 1);
      });


      this.receivedData = this.dataService.sharedData;

      this.remplazarData(this.receivedData);
      
      

  }


  remplazarData(data: FormCotizarModel){
    this.formData.initialDate = data.initialDate;
    this.formData.finalDate = data.finalDate;
    this.formData.origen = data.origen;
    this.formData.email = data.email;
    this.formData.telefono = data.telefono;
    this.tags = data.tags;
    this.listCotizaciones = data.listCotizaciones;
    this.comparar();
  }
  

  comparar(){
    const date1: Date = new Date(this.formData.initialDate);
    const date2: Date = new Date(this.formData.finalDate);


    
  
      // Get the difference in milliseconds
      const diffInMs = Math.abs(date2.getTime() - date1.getTime());
  
      // Convert the difference to days
      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
      if(!isNaN(diffInDays)){
        this.diffDays= diffInDays+1;
      }
   }
  
   
    
  
    
    
  
    remove(tag: string) {
      let index = this.tags.indexOf(tag);
      this.tags = [...this.tags.slice(0, index), ...this.tags.slice(index + 1)];

      const data : datesDestiny = { 
        initialDate : this.formData.initialDate,
        finalDate : this.formData.finalDate,
        tags : this.tags}
      // this.modifyTags.emit(data);
      
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
      }
    }


    
  
  
    
  
    onSelect(event: Event) {
      const target = event.target as HTMLSelectElement;
      if (target) {
        const selectedValue = target.value;
        this.insertTag(selectedValue);

        target.value = "pais";

        if(this.comprobarFecha(this.formData.initialDate) && this.comprobarFecha(this.formData.finalDate)){
          const data : datesDestiny = { 
            initialDate : this.formData.initialDate,
            finalDate : this.formData.finalDate,
            tags : this.tags}
          // this.modifyTags.emit(data);

        }
        
        
        
        
        // Do something with the selected value here
      }
    
    }
  

    comprobarFecha( fecha : string): boolean{

      const timestamp = Date.parse(fecha);

      if (isNaN(timestamp)) {
        return false
      } else {
        return true
      }

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

    agregar(event : any){


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
      
      
      this.router.navigate(['/cotizar']);
    }


    deleteItem(item: cotizacionDataForm) {
      const index = this.listCotizaciones.findIndex(i => i.id === item.id);
      if (index !== -1) {
        
        this.listCotizaciones.splice(index, 1);
      }
    }

    changeAgeInpt(event: any, item: cotizacionDataForm) {
      
      const index = this.listCotizaciones.findIndex(i => i.id === item.id);
      ;
      if (index !== -1) {
        this.listCotizaciones[index].age = event.target.value;
        
      }

      
    }

    seeDetails(){
      this.seeAges = !this.seeAges;
    }

}
