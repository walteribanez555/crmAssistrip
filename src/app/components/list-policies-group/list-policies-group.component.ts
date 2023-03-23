import { Component, OnInit,Input,Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Servicio } from 'src/app/models/Data/Servicio';
import { policie } from 'src/app/models/Pages/policie.model';
import { policiesForm } from 'src/app/models/Pages/policiesForm.model';

@Component({
  selector: 'app-list-policies-group',
  templateUrl: './list-policies-group.component.html',
  styleUrls: ['./list-policies-group.component.css']
})
export class ListPoliciesGroupComponent implements OnInit {
  itemForm: FormGroup;

  @Input() planes: Servicio[];

  @Input()fechaFinal : string;


  planesMostrar : Servicio[] = [];

  nextId = 0;
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
    });
  }

  addItem() {


    const newItem: policie = {
      name: 'Nuevo Cliente',
      lastName: "",
      birthday : "",
      itemForm: this.createItemForm()
    };


    const  PolizaForm : policiesForm = {
      id: this.nextId++,
      isDropdownOpen : false,
      poliza : newItem,
      listPlanes: this.planes
    }
    this.listPolicies.push(PolizaForm);
  }

  onSubmit(item: policiesForm) {
    console.log(`Editing item: ${item.poliza.name} (${item.poliza.lastName}) (${item.poliza.birthday})`);
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


  listPolicies : policiesForm[] = [
    
  ]


  


  constructor() {
    this.itemForm = new FormGroup({
      name: new FormControl(''),
      lastName: new FormControl(''),
      birthday : new FormControl('')
    });


    this.planes = [];
    this.fechaFinal = "";
  }

  ngOnInit(): void {
    this.planesMostrar = this.planes;
    this.addItem();
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
    console.log(policy.listPlanes);

    // Do something with the selected date
    
    
  }


  haveRequirements( plan : Servicio , differenceInYears :number){
    console.log(plan.edad_base, plan.edad_limite);

    const { edad_base, edad_limite} = plan;

    
    
   if(edad_base <= differenceInYears && differenceInYears <= edad_limite){
    console.log("Si entra");
    return true
   }

   return false
    
    
    
  }




}
