import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { Catalogo } from 'src/app/models/Data/Catalogo';

import { policie } from 'src/app/models/Pages/policie.model';
import { policiesForm } from 'src/app/models/Pages/policiesForm.model';
import { CatalogosService } from 'src/app/services/catalogos.service';


// register Swiper custom elements


@Component({
  selector: 'app-generar-polizas',
  templateUrl: './generar-polizas.component.html',
  styleUrls: ['./generar-polizas.component.css']
})
export class GenerarPolizasComponent implements OnInit{


  
  nextId = 0;
  comprobarInfo(){
    this.listPolicies.forEach(item => {
      console.log(item.poliza.name);
    });
  }

  createItemForm(): FormGroup {
    return new FormGroup({
      name: new FormControl(''),
      lastName: new FormControl('')
    });
  }

  addItem() {


    const newItem: policie = {
      name: 'Nueva Cliente',
      lastName: "",
      itemForm: this.createItemForm()
    };


    const  PolizaForm : policiesForm = {
      id: this.nextId++,
      isDropdownOpen : false,
      poliza : newItem
    }
    this.listPolicies.push(PolizaForm);
  }

  onSubmit(item: policiesForm) {
    console.log(`Editing item: ${item.poliza.name} (${item.poliza.lastName})`);
    console.log(`Item form value:`, item.poliza.itemForm.value);
    const formValue = item.poliza.itemForm.value;
    item.poliza.name = formValue.name;
    item.poliza.lastName = formValue.lastName;
  }

  deleteItem(item: policiesForm) {
    const index = this.listPolicies.findIndex(i => i.id === item.id);
    if (index !== -1) {
      this.listPolicies.splice(index, 1);
    }
  }


  formData = {
    initialDate: '',
    finalDate: '',
    
  };

  


  itemForm: FormGroup;



  listPolicies : policiesForm[] = [
    {
      id: this.nextId++,

      isDropdownOpen : false,
      poliza : {
        
        name: 'Este es un cliente',
        lastName : '',
        itemForm: this.createItemForm()
      },

      
    },
    
  ]

  datos: any = {}


  diffDays = -1;
  paises : Catalogo[] =[];
  
  @ViewChild('tagInput') tagInput?: ElementRef;
  @ViewChild('tagList') tagList?: ElementRef;
  @ViewChild('tagNumber') tagNumber!: ElementRef;

  maxTags: number = 10;
  tags: string[] = [];
  stepForm: number = 1;

  

  
  constructor(
    
    private catalogoService : CatalogosService

  ) {

    this.itemForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl('')
    });
   }

  ngOnInit(): void {
    
    this.catalogoService.getPaises().subscribe(
      (data)=> {
        this.paises = data.filter(item => item.status === 1);
      })


  }


  agregar() {
    

    const { initialDate, finalDate} = this.formData;
    const paises = this.tags;


    console.log(paises);
    

    this.datos = {
      initialDate,
      finalDate,
      paises

    }

    this.stepForm +=1;
 }  

 


 

 prevForm(){
  this.stepForm -=1;
 }


  

 

 
  

  
  

  
  








  

  
}
