import { Component, Input, Output, EventEmitter} from '@angular/core';
import { Catalogo } from 'src/app/models/Data/Catalogo';
import { FormGroup,FormControl } from '@angular/forms';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent {



  @Output() loadCliente = new EventEmitter();

  @Output() backButton = new EventEmitter();


  formData : FormGroup = new FormGroup({
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    nit  : new FormControl(''),
    telf : new FormControl(''),
    origen : new FormControl(''),
    email : new FormControl(''),
  });

  

  @Input() countries: Catalogo[];


  constructor(){
    this.countries = [];
  }


  agregar(event : any){
    event.preventDefault();
    this.loadCliente.emit(this.formData);
  }

  backBefore(){
      this.backButton.emit();
  }
  

}
