import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { policie } from 'src/app/models/Pages/policie.model';
import { policiesForm } from 'src/app/models/Pages/policiesForm.model';

@Component({
  selector: 'app-list-policies-group',
  templateUrl: './list-policies-group.component.html',
  styleUrls: ['./list-policies-group.component.css']
})
export class ListPoliciesGroupComponent {


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

  itemForm: FormGroup;

  constructor() {
    this.itemForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl('')
    });
  }


  togglePolicie(policie : any){
    policie.isDropdownOpen = !policie.isDropdownOpen;
   }
  
}
