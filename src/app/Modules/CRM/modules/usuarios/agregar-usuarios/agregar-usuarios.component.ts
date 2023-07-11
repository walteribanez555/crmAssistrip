import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/Modules/shared/services/requests/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-usuarios',
  templateUrl: './agregar-usuarios.component.html',
  styleUrls: ['./agregar-usuarios.component.css']
})
export class AgregarUsuariosComponent implements OnInit {

  private readonly userService = inject(UserService);


  public inputControl: FormControl<any> | null = null;
  public secondControl : FormControl<any> | null = null;



  public userForm : FormGroup = new FormGroup({
    username : new FormControl(null, [Validators.required]),
    user_type : new FormControl(null, [Validators.required]),
    password : new FormControl(null, [Validators.required]),
    confirm : new FormControl( null , [Validators.required]),
    first_name : new FormControl( null , [Validators.required]),
    last_name : new FormControl(null , [Validators.required]),
    email : new FormControl( null , [Validators.required]),
    phone : new FormControl(null, [Validators.required]),
    rol_id  : new FormControl(null , [ Validators.required]),
  })


  constructor(){

  }
  ngOnInit(): void {

    this.inputControl= this.userForm.get('rol_id') as FormControl<any>;
    this.secondControl= this.userForm.get('user_type') as FormControl<any>;


  }



  submitForm(){

    const { username, user_type , password, confirm, first_name , last_name, email , phone, rol_id} = this.userForm.value;


    this.userService.postUser(username, rol_id, user_type, password, confirm, first_name, last_name, email, phone).subscribe( {
      next :  ( data ) => {   this.showSucces()},
      error : ( error) => {   this.showError("No se pudo crear correctamente")}
    })


  }


  showSucces(){

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Creado Exitosamente',
      showConfirmButton: false,
      timer: 1500

    });
  }

  showError(error : string){
    Swal.fire({
      position: 'top-end',
      icon : 'error',
      title: 'No se pudo realizar',
      showConfirmButton: false,
      timer: 1500

    });
  }

}
