import { Component } from '@angular/core';
import { Servicio } from 'src/app/Modules/shared/models/Data/Servicio';
import { CuponPost } from 'src/app/Modules/shared/models/Data/Cupon';


import { CuponesService } from 'src/app/Modules/shared/services/requests/cupones.service';

import { ServiciosService } from 'src/app/Modules/shared/services/requests/servicios.service';
import Swal from 'sweetalert2';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { loadingAnimation } from 'src/app/Modules/shared/animations/loading.animation';

@Component({
  selector: 'app-crear-cupones',
  templateUrl: './crear-cupones.component.html',
  styleUrls: ['./crear-cupones.component.css'],
  animations : [
    loadingAnimation
  ]
})
export class CrearCuponesComponent {


  minDate           :    string = "";
  listado_servicios :     any[] = [];
  nombre : string | null = null;
  initialDate!  :     Date;
  finalDate!    :     Date;
  checkbox1Value = true;
  checkbox2Value = false;
  monto!: number;
  hasLoaded = true;


  isReady = false;




  constructor(
    private serviciosService : ServiciosService,
    private cuponesService : CuponesService,
    private router : Router,

  ){
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }



  ngOnInit(): void {
    this.hasLoaded = false;
    this.serviciosService.getServicios().subscribe(
      servicios => {
        servicios.forEach(servicio => {
          this.listado_servicios.push({
            selectedItem : false,
            servicio
          })
        })


        this.hasLoaded = true;

      }
    )
  }


  onCheckboxChange( type : number) {

    if(type === 1){
      this.checkbox2Value =  false;
    }
    if(type === 2){
      this.checkbox1Value =  false;
    }
    this.onChangeForm();

  }

  onChangeForm(){
    if(this.initialDate && this.finalDate && (this.checkbox1Value===true || this.checkbox2Value===true) && this.monto && this.oneAtLeast()  ){
      this.isReady = true;

      return
    }

    this.isReady= false;
    return

  }

  selectItem(servicio : any){
    console.log(servicio);
    servicio.selectedItem = !servicio.selectedItem;
    this.onChangeForm();

  }

  oneAtLeast() : boolean{

     return (this.listado_servicios.some(  servicio => servicio.selectedItem === true )  )
  }


  createCupon(){


    if(!this.isReady){
      this.showError();
    }


      this.showLoading();

      const cupones : CuponPost[] = [];
      const requests : any[] = [];

      const servicios : any[] = this.listado_servicios.filter(
        servicio => servicio.selectedItem === true
      )


      servicios.forEach(
        servicio => {
          const cupon : CuponPost = {
            fecha_desde : this.initialDate.toString(),
            fecha_hasta : this.finalDate.toString(),
            nombre : this.nombre,
            servicio_id : servicio.servicio.servicio_id,
            status: 1,
            tipo_valor : this.checkbox1Value ? 1 : 2,
            valor: this.monto,
            oficina_id : 1000,
          }
          cupones.push(cupon);
        }
      )


      cupones.forEach(
        cupon => {
          requests.push(this.cuponesService.postCupon(cupon))
        }
      )


      forkJoin(requests).subscribe(
        response => {
          Swal.close();
          this.showSuccess();
          this.router.navigate(['../dashboard/cupones/listado-cupones']);
          this.isReady = false;

        }
      )



      return


    }


    showLoading(){
      Swal.fire({

        text: 'Espere un momento mientras se procesa la informacion',
        imageUrl: "assets/svg/loading.svg",

        showConfirmButton : false,
        allowOutsideClick: false,

        imageWidth: 50,
        imageHeight: 50,
        imageAlt: 'Custom image',
      })
    }

    showError(){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo salió mal!',
        footer: 'Verifique que todos los campos esten llenos'
      });
    }

    showSuccess(){
      Swal.fire({
        icon: 'success',
        title: 'Cupones creados con éxito',
        showConfirmButton: false,
        timer: 2500
      })
    }

    cancel(){
      this.router.navigate(['../dashboard/cupones/listado-cupones']);
    }
}











