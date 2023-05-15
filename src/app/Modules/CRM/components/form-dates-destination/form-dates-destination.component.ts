import { Component, OnInit,Input,Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Catalogo } from 'src/app/Modules/shared/models/Data/Catalogo';
import { datesDestiny } from 'src/app/Modules/shared/models/Pages/datesDestiny.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-dates-destination',
  templateUrl: './form-dates-destination.component.html',
  styleUrls: ['./form-dates-destination.component.css']
})
export class FormDatesDestinationComponent {

  @Input() countries: Catalogo[];
  @Output() myOutputEvent = new EventEmitter<datesDestiny>();

  inputValue: string ="";

  formData = {
    initialDate: '',
    finalDate: '',
    inputValue : '',
    
  };

  tags: string[] = [];
  diffDays = -1;
  paises : Catalogo[] =[];
  


  constructor(
    
    

  ){
    this.countries = [];
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
        this.formData.inputValue = 'pais';
        console.log(this.formData.inputValue);
        
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

      const {initialDate, finalDate}= this.formData;

      const data : datesDestiny = { 
        initialDate,
        finalDate,
        tags : this.tags}
     


      this.myOutputEvent.emit(data);
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


   

}
