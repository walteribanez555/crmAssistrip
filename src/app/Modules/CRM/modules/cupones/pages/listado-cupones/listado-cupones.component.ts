
import { Component, HostListener, ElementRef,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { loadingAnimation } from 'src/app/Modules/shared/animations/loading.animation';
import { Cupon } from 'src/app/Modules/shared/models/Data/Cupon';
import { Servicio } from 'src/app/Modules/shared/models/Data/Servicio';
import { CuponesService } from 'src/app/Modules/shared/services/requests/cupones.service';
import { ServiciosService } from 'src/app/Modules/shared/services/requests/servicios.service';

@Component({
  templateUrl: './listado-cupones.component.html',
  styleUrls: ['./listado-cupones.component.css'],
  animations : [
    loadingAnimation
  ]
})
export class ListadoCuponesComponent  implements OnInit{


  listado_servicios : Servicio[] = [];
  listado_Cupones : Cupon[] = [];
  hasLoaded = false;






  constructor(
    private cupones: CuponesService,
    private servicioService : ServiciosService,
    private router : Router
  ){}


  ngOnInit(){

    this.hasLoaded = false;
    this.cupones.getCupones().subscribe({
      next:  (items : Cupon[])=> {
        this.listado_Cupones = items;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.hasLoaded = true;
      }
    }),
    this.servicioService.getServicios().subscribe({
      next: ( resp ) => {
        this.listado_servicios = resp;
      },
      error: (err) => {
        console.log(err);
      },
      complete : ( ) => {
        // this.hasLoaded = true;
      }
    })
  }



  mapServiceById( id: number) {
    return this.listado_servicios.find( item => item.servicio_id === id);
  }



  createCupones(){
    this.router.navigate(['../dashboard/cupones/crear-cupones']);
  }

  showDetails(idCupon : number){
    this.router.navigate([`../dashboard/cupones/${idCupon}`]);

  }


  editDetails(idCupon : number){
    this.router.navigate([`../dashboard/cupones/${idCupon}/editar`]);

  }






}
