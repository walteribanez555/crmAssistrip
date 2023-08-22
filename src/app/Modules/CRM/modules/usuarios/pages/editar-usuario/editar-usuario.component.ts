import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { RolService } from 'src/app/Modules/shared/services/requests/rol.service';
import { UserService } from 'src/app/Modules/shared/services/requests/user.service';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {


  private readonly userService = inject(UserService);
  private readonly route = inject(ActivatedRoute);
  private readonly rolService = inject(RolService);
  private readonly router = inject(Router);


  public inputControl: FormControl<any> | null = null;
  public secondControl : FormControl<any> | null = null;



  public userForm : FormGroup | null = new FormGroup({
    username : new FormControl("Walter Ronny Ibañez Saucedo", [Validators.required]),
    user_type : new FormControl(null, [Validators.required]),
    password : new FormControl(null, [Validators.required]),
    confirm : new FormControl( null , [Validators.required]),
    first_name : new FormControl( null , [Validators.required]),
    last_name : new FormControl(null , [Validators.required]),
    email : new FormControl( null , [Validators.required]),
    phone : new FormControl(null, [Validators.required]),
    rol_id  : new FormControl(null , [ Validators.required]),
  })
  isLoading: boolean = false;
  usuarioId: any;
  usuario: any;
  rols: any[] = [];



  constructor(){

  }

  ngOnInit(): void {

    this.isLoading= true;



    this.isLoading = true;


    this.route.params.subscribe( params => {
      this.usuarioId = params['id'];

      this.userService.getByUsernameUsers(this.usuarioId).pipe(
        switchMap(
          data => {
            this.usuario = data[0];


            return this.rolService.getRoles()
          }
        )
      ).subscribe({
        next : (data) => {


          const roles =    this.usuario?.rol_id.split(',');


           this.rols = data.filter( rol => roles?.includes(rol.rol_id.toString())) ;


           const rolsMapp = this.rols.map( rol => {
            return rol.rol_id
           })



           this.userForm = this.createItemForm(this.usuario);


           console.log(this.usuario);
           this.inputControl= this.userForm.get('rol_id') as FormControl<any>;
           this.secondControl= this.userForm.get('user_type') as FormControl<any>;
           this.inputControl?.setValue(rolsMapp.join(','));
           this.secondControl.setValue(this.usuario.user_type);

           this.isLoading = false;

          },
        error : (err) => { console.log(err)},
        complete : () => { this.isLoading=false}
      })



    })


  }


  createItemForm( usuario : any ){

   return  new FormGroup({
      username : new FormControl(usuario.username, [Validators.required]),
      user_type : new FormControl(usuario.user_type, [Validators.required]),
      password : new FormControl(usuario.password, [Validators.required]),
      confirm : new FormControl( usuario.password, [Validators.required]),
      first_name : new FormControl( usuario.first_name, [Validators.required]),
      last_name : new FormControl( usuario.last_name , [Validators.required]),
      email : new FormControl( usuario.email , [Validators.required]),
      phone : new FormControl( usuario.phone, [Validators.required]),
      rol_id  : new FormControl( usuario.rol_id , [ Validators.required]),
    })



  }


  submitForm(){

    const { username, user_type , password, confirm, first_name , last_name, email , phone, rol_id} = this.userForm?.value;





    this.userService.updateUser(username, rol_id, user_type, first_name, last_name, email, phone , password, confirm).subscribe( {
      next :  ( data ) => {   console.log(data),this.showSucces(), this.router.navigate([`/dashboard/usuarios/usuario/${this.usuarioId}`])},
      error : ( error) => {   this.showError(error)}
    })


  }


  showSucces(){

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Actualizado correctamente',
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
