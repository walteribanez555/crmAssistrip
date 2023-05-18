import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { loadingAnimation } from 'src/app/Modules/shared/animations/loading.animation';
import { AuthService } from 'src/app/Modules/shared/services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    loadingAnimation,
  ]
})
export class LoginComponent implements OnInit {

  constructor(  private authService : AuthService,
                private router : Router
    ){

  }



  ngOnInit(): void {
    if(this.authService.isLoggedIn()){
      this.router.navigate(['../../dashboard/polizas/listado-polizas']);
    }
  }


  hasLoaded: boolean = true;

  public loginForm = new FormGroup(
    {

      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),

    }
  ); 

  showPassword: boolean = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }



  login(){

    if(!this.loginForm.valid){
      return;
    }


    if(this.loginForm.value.email && this.loginForm.value.password){
      if(!this.authService.login(this.loginForm.value.email , this.loginForm.value.password)){
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Usuario o contraseña incorrectos',
          showConfirmButton: false,
          timer: 1500
        })


        return;
      }

      this.hasLoaded = true;

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Bienvenido',
        showConfirmButton: false,
        timer: 1500
        
      })


      this.router.navigate(['../../dashboard/polizas/listado-polizas']);



    }
    




    
  }
  




}
