import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Cupon } from 'src/app/Modules/shared/models/Data/Cupon';
import { CuponesService } from 'src/app/Modules/shared/services/requests/cupones.service';
import { ServiciosService } from 'src/app/Modules/shared/services/requests/servicios.service';
import { UtilsService } from 'src/app/Modules/shared/services/utils/utils.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cupon',
  templateUrl: './cupon.component.html',
  styleUrls: ['./cupon.component.css']
})
export class CuponComponent implements OnInit {

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
        this.listado_servicios = servicios.filter( servicio => this.cupon?.servicio_id === servicio.servicio_id);
        this.hasLoaded = true;
      }

    )
  }


  showDetails(idCupon : number){
    this.router.navigate([`../dashboard/cupon/${idCupon}`]);

  }

  editDetails(idCupon : any){
    this.router.navigate([`../dashboard/cupones/${idCupon}/editar`]);

  }

  deleteCupon(idCupon : any){
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Estas seguro de eliminar el cupon?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',

      confirmButtonText: 'Si, estoy seguro'
    }).then((result) => {
      if (result.isConfirmed) {
        this.showLoading();

        this.cuponesService.deleteCupon(idCupon).subscribe(
          data => {
            console.log(data);
            Swal.close();
            this.showSuccess();

            this.router.navigate([`../dashboard/cupones/listado-cupones`]);

          }
        )

      }
    }
    )
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

  showSuccess(){
    Swal.fire({
      icon: 'success',
      title: 'Cupon eliminado exitosamente',
      showConfirmButton: false,
      timer: 2500
    })
  }
}
