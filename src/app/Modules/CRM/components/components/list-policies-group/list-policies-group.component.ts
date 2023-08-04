import { Component, OnInit, OnChanges,Input,Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Catalogo } from 'src/app/Modules/shared/models/Data/Catalogo';
import { Extra } from 'src/app/Modules/shared/models/Data/Extra';
import { Servicio } from 'src/app/Modules/shared/models/Data/Servicio';
import { ExtraForm } from 'src/app/Modules/shared/models/Pages/extra.model';
import { policie } from 'src/app/Modules/shared/models/Pages/policie.model';
import { policiesForm } from 'src/app/Modules/shared/models/Pages/policiesForm.model';

import Swal from 'sweetalert2';


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


  @Input() countries: Catalogo[];


  @Output() backPrevBtn = new EventEmitter();
  @Output() nextBtn = new EventEmitter();

  @Output() addPolicie = new EventEmitter<policiesForm>();
  @Output() deletePolicie = new EventEmitter<number>();


  

  nextId = 0;

  backPrev(){
    
    this.backPrevBtn.emit();
  }

  next(){



    if(!this.listPolicies.every(policie => policie.isFinished)){
      this.errorMessage("Debe confirmar cada poliza");
      return;
      
    }
    this.nextBtn.emit();
    return;

    

    
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
      ci : new FormControl(''),
      passport : new FormControl(''),
      country : new FormControl(''),
      email : new FormControl(''),
      phone : new FormControl(''),
      gender : new FormControl(''),
      nationality : new FormControl(''),
    });
  }

  addItem() {


    const newItem: policie = {
      name: `Cliente nro: ${this.nextId +1}`,
      lastName: "",
      birthday : "",
      plan : "",
      itemForm: this.createItemForm(),
      
    };


    const  PolizaForm : policiesForm = {
      id: this.nextId++,
      isDropdownOpen : true,
      isPlainSelected: false,
      isFinished : false,
      date  : "",
      poliza : newItem,
      listPlanes: this.planes,
      polizaNombre : "Paquete del Cliente",
      listExtras : []
    }
    this.listPolicies.push(PolizaForm);
  }

  onSubmit(item: policiesForm) {
    
    const formValue = item.poliza.itemForm.value;

    
    if(!(formValue.passport>0)){
      this.errorMessage("Por favor rellenar el campo de pasaporte");
      return;
    }


     
    if(!(formValue.name.length>0)){
      this.errorMessage("Por favor rellenar el campo del nombre");
      return;
    }

    if(!(formValue.lastName.length>0)){
      this.errorMessage("Por favor rellenar el campo del apellido");
      return;
    }

    
    if(!this.comprobarFecha(formValue.birthday)){
     
      this.errorMessage("Por favor escribir correctamente la fecha del cumpleaños");
      return;
    }


    if(!(formValue.plan.length>0)){
      this.errorMessage("Debe escoger un plan");
      return;
    }

    
    
    if(!(formValue.email.length>0)){
      this.errorMessage("Debe insertar el email");
      return;
    }
    if(!(formValue.phone.length>0)){
      this.errorMessage("Debe insertar el numero");
      return;
    }
    if(!(formValue.gender.length>0)){
      this.errorMessage("Debe insertar el genero");
      return;
    }
    if(!(formValue.ci.length>0)){
      this.errorMessage("Debe insertar el ci de la persona");
      return;
    }

    if(!(formValue.nationality.length>0)){
      this.errorMessage("Debe insertar la nacionalidad de la persona");
      return;
    }
    


    item.isDropdownOpen  = false;
    item.poliza.name = formValue.name;
    item.poliza.lastName = formValue.lastName;
    item.poliza.birthday = formValue.birthday;
    item.poliza.plan = formValue.plan;
    item.isFinished = true;
   
    item.polizaNombre =  item.listPlanes.filter(plan => {
      if(plan.servicio_id === formValue.plan*1){
        return true;
      }
      return false
    })[0].servicio;

    this.addPolicie.emit(item);
    
  }

  deleteItem(item: policiesForm) {
    const index = this.listPolicies.findIndex(i => i.id === item.id);
    if (index !== -1) {
      this.deletePolicie.emit(item.id);
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
    this.countries = [];
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
    

    policy.date = inputElement.value;

    
    
    policy.listPlanes = this.showPlains(policy);
     
    
  }


  showPlains( policy : policiesForm): Servicio[]{
    

    const selectedDate  =   new Date(policy.date);
    

    const fechaViaje = new Date(this.fechaFinal);


    

    const differenceInMilliseconds = fechaViaje.getTime() - selectedDate.getTime();
    const differenceInYears = differenceInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);

    
    policy.listPlanes = this.planes    

    // Do something with the selected date
    

    if(policy.date !== ""){
      
      
      return policy.listPlanes.filter(plan => this.haveRequirements(plan, differenceInYears));
    }

    

    

    return  this.planes;
  }


  haveRequirements( plan : Servicio , differenceInYears :number){
    

    const { edad_base, edad_limite} = plan;

    

    
    
   if(  edad_base <= differenceInYears && differenceInYears <= edad_limite){
    
    return true
   }

   return false
    
  }



  comprobarPlanes(){

    this.listPolicies.forEach(policies => {
      
      policies.listPlanes =  this.showPlains(policies);
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

    policy.listExtras = this.showExtras();

    policy.isPlainSelected = true;
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

 
    
    
    comprobarFecha( fecha : string): boolean{

      const timestamp = Date.parse(fecha);
      console.log(timestamp);
      if (isNaN(timestamp)) {
        
        return false
      } else {
        return true
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
  




}
