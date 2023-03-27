import { Component, OnInit, OnChanges,Input,Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Extra } from 'src/app/models/Data/Extra';

import { Servicio } from 'src/app/models/Data/Servicio';
import { ExtraForm } from 'src/app/models/Pages/extra.model';
import { policie } from 'src/app/models/Pages/policie.model';
import { policiesForm } from 'src/app/models/Pages/policiesForm.model';

@Component({
  selector: 'app-list-policies-group',
  templateUrl: './list-policies-group.component.html',
  styleUrls: ['./list-policies-group.component.css']
})
export class ListPoliciesGroupComponent implements OnInit {
  // itemForm: FormGroup;

  @Input() planes: Servicio[];

  @Input()fechaFinal : string;

  @Input()extraList : Extra[];


  @Output() backPrevBtn = new EventEmitter();
  @Output() nextBtn = new EventEmitter();


  

  nextId = 0;

  backPrev(){
    
    this.backPrevBtn.emit();
  }

  next(){
    this.nextBtn.emit();
  }

  comprobarInfo(){
    this.listPolicies.forEach(item => {
      console.log(item.poliza.name);
    });
  }

  createItemForm(): FormGroup {
    return new FormGroup({
      name: new FormControl(''),
      lastName: new FormControl(''),
      birthday : new FormControl(''),
      plan : new FormControl(''),
    });
  }

  addItem() {


    const newItem: policie = {
      name: `Cliente nro: ${this.nextId +1}`,
      lastName: "",
      birthday : "",
      plan : "",
      itemForm: this.createItemForm(),
      extras: [],
    };


    const  PolizaForm : policiesForm = {
      id: this.nextId++,
      isDropdownOpen : true,
      isPlainSelected: false,
      poliza : newItem,
      listPlanes: this.planes,
      polizaNombre : "Paquete del Cliente",
      listExtras : []
    }
    this.listPolicies.push(PolizaForm);
  }

  onSubmit(item: policiesForm) {
    console.log(`Editing item: ${item.poliza.name} (${item.poliza.lastName}) (${item.poliza.birthday}) (${item.poliza.plan}) `);
    console.log(`Item form value:`, item.poliza.itemForm.value);
    const formValue = item.poliza.itemForm.value;
    item.poliza.name = formValue.name;
    item.poliza.lastName = formValue.lastName;
    item.poliza.birthday = formValue.birthday;
    item.poliza.plan = formValue.plan;
   
    item.polizaNombre =  item.listPlanes.filter(plan => {
      if(plan.servicio_id === formValue.plan*1){
        return true;
      }
      return false


    })[0].servicio;
    
  }

  deleteItem(item: policiesForm) {
    const index = this.listPolicies.findIndex(i => i.id === item.id);
    if (index !== -1) {
      this.listPolicies.splice(index, 1);
    }
  }


  listPolicies : policiesForm[] = [
    
  ]


  


  constructor() {
    // this.itemForm = new FormGroup({
    //   name: new FormControl(''),
    //   lastName: new FormControl(''),
    //   birthday : new FormControl(''),
    //   plan : new FormControl(''),
    // });

    
    this.planes = [];
    this.fechaFinal = "";
    this.extraList = [];
  }

  ngOnInit(): void {
    
    this.addItem();
  }

  ngOnChanges():void { 
    
    
    this.comprobarPlanes();
    
  }

  togglePolicie(policie : any){
    policie.isDropdownOpen = !policie.isDropdownOpen;
   }
  

   onDateChange(event: Event ,policy : policiesForm) {
    const inputElement = event.target as HTMLInputElement;
    const selectedDate  =   new Date(inputElement.value);
    

    const fechaViaje = new Date(this.fechaFinal);


    

    const differenceInMilliseconds = fechaViaje.getTime() - selectedDate.getTime();
    const differenceInYears = differenceInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);


    policy.listPlanes = this.planes
    
    policy.listPlanes = policy.listPlanes.filter(plan => this.haveRequirements(plan, differenceInYears))
    

    // Do something with the selected date
    
    
  }


  haveRequirements( plan : Servicio , differenceInYears :number){
    

    const { edad_base, edad_limite} = plan;

    
    
   if(edad_base <= differenceInYears && differenceInYears <= edad_limite){
    
    return true
   }

   return false
    
  }



  comprobarPlanes(){
    this.listPolicies.forEach(policies => {
      policies.listPlanes =  this.planes;
    })
  }


  toggleExtra( policy: policiesForm, id : number){
    policy.listExtras[id].checked = !policy.listExtras[id].checked;
    

  }

  togglePlain(event: Event ,policy : policiesForm){
    const inputElement  = event.target as HTMLInputElement;
    
    if(inputElement.value === "pais" ){
      return;
    }

    const valueAsNumber = parseFloat(inputElement.value);

    if (isNaN(valueAsNumber)) {
      // Manejar el caso en el que el valor del elemento de entrada no es un número válido
      return;
    }

    policy.listExtras = this.showExtras(policy, valueAsNumber);

    policy.isPlainSelected = true;
  }

  showExtras(policy : policiesForm, plain : number): ExtraForm[]{
    const extrasFiltered : ExtraForm[] = this.extraList.map((extra,index) => {
      return {
        id : index,
        extra,
        checked : false
      }
    });


    return extrasFiltered


  }

 
    
    
    
  


  




}
