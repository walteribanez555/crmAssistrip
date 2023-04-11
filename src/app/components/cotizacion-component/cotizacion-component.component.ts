import { Component, OnInit,Input,Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Catalogo } from 'src/app/models/Data/Catalogo';
import { Extra } from 'src/app/models/Data/Extra';
import { Servicio } from 'src/app/models/Data/Servicio';
import { cotizacionForm } from 'src/app/models/Pages/cotizacionForm.model';
import { datesDestiny } from 'src/app/models/Pages/datesDestiny.model';
import { ExtraForm } from 'src/app/models/Pages/extra.model';
import { policiesForm } from 'src/app/models/Pages/policiesForm.model';
import { CatalogosService } from 'src/app/services/catalogos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cotizacion-component',
  templateUrl: './cotizacion-component.component.html',
  styleUrls: ['./cotizacion-component.component.css']
})
export class CotizacionComponentComponent  {

  @Input() countries: Catalogo[];
  @Input()extraList : Extra[];
  @Input() planes: Servicio[];
  @Output() myOutputEvent = new EventEmitter<datesDestiny>();

  inputValue: string ="";

  nextId : number = 0;

  formData = {
    initialDate: '',
    finalDate: '',
    inputValue : '',
    
  };

  tags: string[] = [];
  diffDays = -1;
  paises : Catalogo[] =[];
  
  @Output() modifyTags = new EventEmitter<datesDestiny>();
  @Output() nextForm = new EventEmitter();

  @Output() addPolicie = new EventEmitter<cotizacionForm>();
  @Output() deletePolicie = new EventEmitter<number>();


  @ViewChild('plain') myPlain?: ElementRef;


  
  listCotizaciones : cotizacionForm[] = [];

  constructor(
    

  ){
    this.planes = [];
    this.countries = [];
    this.extraList = [];
  }

  


  

  

  comparar(){
    const date1: Date = new Date(this.formData.initialDate);
    const date2: Date = new Date(this.formData.finalDate);


    
  
      // Get the difference in milliseconds
      const diffInMs = Math.abs(date2.getTime() - date1.getTime());
  
      // Convert the difference to days
      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
      if(!isNaN(diffInDays)){
        this.diffDays= diffInDays;
      }
   }
  
   
    
  
    
    
  
    remove(tag: string) {
      let index = this.tags.indexOf(tag);
      this.tags = [...this.tags.slice(0, index), ...this.tags.slice(index + 1)];

      const data : datesDestiny = { 
        initialDate : this.formData.initialDate,
        finalDate : this.formData.finalDate,
        tags : this.tags}
      this.modifyTags.emit(data);
      
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
          this.modifyTags.emit(data);

        }
        
        
        
        
        // Do something with the selected value here
      }
    
    }
  

    agregar(event : Event){

      event.preventDefault();


      if(!(this.tags.length>0)){
        this.errorMessage("Se necesita al menos un destino");
        return;
      }

      if(!this.comprobarFecha(this.formData.initialDate)){
        this.errorMessage("Error en el formato de la fecha de salida");
        return;
      }
      if(!this.comprobarFecha(this.formData.finalDate)){
        this.errorMessage("Error en el formato de la fecha de llegada")
        return;
      }

      this.nextStep();
    }
  
  

    errorMessage(errorMsg : string){

      Swal.fire({
        title: 'Error',
        text: errorMsg,
        icon : 'error',
        confirmButtonText: 'Continuar'
      })

    }

    comprobarFecha( fecha : string): boolean{

      const timestamp = Date.parse(fecha);

      if (isNaN(timestamp)) {
        return false
      } else {
        return true
      }

    }

    nextStep(){
      this.nextForm.emit();
    }

    createItemForm(): FormGroup {
      return new FormGroup({
        age: new FormControl(''),
        plan : new FormControl(''),
      });
    }


    addItem(){
      
      const cotizacionfrm : cotizacionForm ={ 
        id: this.nextId++,
        age:  0,
        isDropdownOpen : true,
        isPlainSelected: false,
        isFinished : false,
        itemForm : this.createItemForm(),
        listPlanes: this.planes,
        listExtras : []
      }


      this.listCotizaciones.push(cotizacionfrm);

    }

    togglePlain(event: Event ,cotizacion : cotizacionForm){
      const inputElement  = event.target as HTMLInputElement;
      
      if(inputElement.value === "pais" ){
        return;
      }
  
      const valueAsNumber = parseFloat(inputElement.value);
  
      if (isNaN(valueAsNumber)) {
        // Manejar el caso en el que el valor del elemento de entrada no es un número válido
        return;
      }
  
      cotizacion.listExtras = this.showExtras();
  
      cotizacion.isPlainSelected = true;
    }
  
    showExtras(): ExtraForm[]{
      const extrasFiltered : ExtraForm[] = this.extraList.map((extra,index) => {
        return {
          id : index,
          extra,
          checked : false
        }
      });
  
  
      return extrasFiltered
  
  
    }


    togglePolicie(policie : cotizacionForm){
      console.log("Hola mundo");
      policie.isDropdownOpen = !policie.isDropdownOpen

    }

    onSubmit( cotizacion : cotizacionForm){
      const formValue = cotizacion.itemForm.value;
      if(!(formValue.age>0)){
        this.errorMessage("Por favor rellenar el campo de la edad para comprobar");
        return;
      }

      this.addPolicie.emit(cotizacion);

    }

    toggleExtra( policy: cotizacionForm, id : number){
      policy.listExtras[id].checked = !policy.listExtras[id].checked;
      
      
    }

    deleteItem(item: cotizacionForm) {
      const index = this.listCotizaciones.findIndex(i => i.id === item.id);
      if (index !== -1) {
        this.deletePolicie.emit(item.id);
        this.listCotizaciones.splice(index, 1);
      }
    }


    addNewPolicie(cotizacion : cotizacionForm){
      this.addPolicie.emit(cotizacion);
      cotizacion.isDropdownOpen = false;
      
    }


    onDateChange(event: Event ,policy : cotizacionForm) {
      const inputElement = event.target as HTMLInputElement;
      
  
      
      policy.age = parseInt(inputElement.value);
      

      

     
      
      
      policy.listPlanes = this.showPlains(policy);
       
      
    }

    showPlains( cotizacion : cotizacionForm): Servicio[]{

      cotizacion.listPlanes = this.planes    

  
      if(cotizacion.age > 0){

        return cotizacion.listPlanes.filter(plan => this.haveRequirements(plan, cotizacion.itemForm.value.age));
      }
      return  this.planes;
    }


    haveRequirements( plan : Servicio , differenceInYears :number){
    
    const { edad_base, edad_limite} = plan;
 
     if(  edad_base <= differenceInYears && differenceInYears < edad_limite){
      
      return true
     }
  
     return false
      
    }
  

    ngOnChanges():void { 
    
      this.comprobarPlanes();
      
    }

    comprobarPlanes(){

      this.listCotizaciones.forEach(cotizacion => {
        
        cotizacion.listPlanes =  this.showPlains(cotizacion);
      })
    }


    next(){



      if(!this.listCotizaciones.every(policie => policie.isFinished)){
        this.errorMessage("Debe confirmar cada poliza");
        return;
        
      }
      this.nextForm.emit();
      return;
  
      
  
      
    }

    
}
