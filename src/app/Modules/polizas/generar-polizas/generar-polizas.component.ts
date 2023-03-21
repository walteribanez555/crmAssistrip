import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Catalogo } from 'src/app/models/Data/Catalogo';
import { CatalogosService } from 'src/app/services/catalogos.service';


// register Swiper custom elements


@Component({
  selector: 'app-generar-polizas',
  templateUrl: './generar-polizas.component.html',
  styleUrls: ['./generar-polizas.component.css']
})
export class GenerarPolizasComponent implements OnInit{


  formData = {
    initialDate: '',
    finalDate: ''
  };


  prueba : Boolean = false;
  paises : Catalogo[] =[];
  
  @ViewChild('tagInput') tagInput?: ElementRef;
  @ViewChild('tagList') tagList?: ElementRef;
  @ViewChild('tagNumber') tagNumber!: ElementRef;

  maxTags: number = 10;
  tags: string[] = [];


  initialDate: string= '';

  
  constructor(
    
    private catalogoService : CatalogosService

  ) {
   }

  ngOnInit(): void {
    
    this.catalogoService.getPaises().subscribe(
      (data)=> {
        this.paises = data.filter(item => item.status === 1);
      })


  }


  onSubmit() {
    console.log("Hola mundo")
    console.log('Form data:', this.formData);
    // You can perform any further actions with the form data here
  }

  loadForm(){
    console.log("Hola mundo");
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
        if (this.tags.length < 20) {
          tag.split(',').forEach(tag => {
            this.tags.push(tag);
          });
        }
      }
    }
  }


  comprobarIngresoDatos(){
    console.log(this.tags);
    console.log(this.initialDate);
  }

  onSelect(event: Event) {
    const target = event.target as HTMLSelectElement;
    if (target) {
      const selectedValue = target.value;
      this.insertTag(selectedValue);
      // Do something with the selected value here
    }
  }







  

  
}
