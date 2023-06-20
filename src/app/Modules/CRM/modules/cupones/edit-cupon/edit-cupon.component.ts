import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, switchMap } from 'rxjs';
import { Cupon, CuponPost } from 'src/app/Modules/shared/models/Data/Cupon';
import { CuponesService } from 'src/app/Modules/shared/services/requests/cupones.service';
import { ServiciosService } from 'src/app/Modules/shared/services/requests/servicios.service';
import { UtilsService } from 'src/app/Modules/shared/services/utils/utils.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import Swal from 'sweetalert2';
import { display } from 'html2canvas/dist/types/css/property-descriptors/display';
import { loadingAnimation } from 'src/app/Modules/shared/animations/loading.animation';

@Component({
  selector: 'app-edit-cupon',
  templateUrl: './edit-cupon.component.html',
  styleUrls: ['./edit-cupon.component.css'],
  animations: [
    loadingAnimation,
  ]
})
export class EditCuponComponent {


  minDate           :    string = "";
  listado_servicios :     any[] = [];
  nombre : string | null  = null;
  initialDate!  :     string;
  finalDate!    :     string;
  checkbox1Value = true;
  checkbox2Value = false;
  monto!: number;
  hasLoaded = true;

  isReady = false;

  cupon? : Cupon;




  constructor(
    private serviciosService : ServiciosService,
    private cuponesService : CuponesService,
    private router : Router,
    private route : ActivatedRoute,
    private utilsService : UtilsService,

  ){
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }



  ngOnInit(): void {


    const cuponId = parseInt(this.route.snapshot.paramMap.get('id')??"0");

    this.hasLoaded = false;

    this.cuponesService.getCuponById(cuponId).pipe(

      switchMap(
        cupones => {
          //Obtenemos el primer elemento
          this.cupon = cupones[0];


          //Establecemos los datos

          this.nombre         = this.cupon.nombre ? this.cupon.nombre : null,
          this.initialDate    = this.utilsService.getDateDto(this.cupon.fecha_desde).toISOString().slice(0, 10);
          this.finalDate      = this.utilsService.getDateDto(this.cupon.fecha_hasta).toISOString().slice(0, 10);
          this.monto          = this.cupon.valor;
          this.checkbox1Value = this.cupon.tipo_valor === 1 ? true : false;
          this.checkbox2Value = this.cupon.tipo_valor === 2 ? true : false;


          return this.serviciosService.getServicios()
        }
      )

    ).subscribe(
      servicios => {
        servicios.forEach(servicio => {

          this.listado_servicios.push({
            selectedItem : (this.cupon?.servicio_id === servicio.servicio_id),
            servicio
          })

          this.hasLoaded = true;

        })
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

    if(this.nombre){
      console.log("hola");
    }



    if(this.initialDate && this.finalDate && (this.checkbox1Value===true || this.checkbox2Value===true) && this.monto && this.oneAtLeast()  && this.nombre ){
      this.isReady = true;

      return;
    }

    this.isReady= false;
    return

  }

  selectItem(servicio : any){

    this.uncheckServices();
    servicio.selectedItem = !servicio.selectedItem;
    this.onChangeForm();

  }


  uncheckServices(){
    this.listado_servicios.forEach(
      servicio => servicio.selectedItem = false
    )
  }

  oneAtLeast() : boolean{

     return (this.listado_servicios.some(  servicio => servicio.selectedItem === true )  )
  }


  editCupon(){


    if(!this.isReady){
      this.showError();
      return
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
            servicio_id : servicio.servicio.servicio_id,
            nombre : this.nombre,
            status: 1,
            tipo_valor : this.checkbox1Value ? 1 : 2,
            valor: this.monto,
          }
          cupones.push(cupon);
        }
      )


      cupones.forEach(
        cupon => {
          if(this.cupon?.cupon_id){
            requests.push(this.cuponesService.editCupon(this.cupon?.cupon_id,cupon))
          }
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
        title: 'Cupones editado con exito',
        showConfirmButton: false,
        timer: 2500
      })
    }

    cancel(){
      this.router.navigate(['../dashboard/cupones/listado-cupones']);
    }
}
