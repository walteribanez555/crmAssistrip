
import { Component, HostListener, ElementRef,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { loadingAnimation } from 'src/app/Modules/shared/animations/loading.animation';
import { Cupon } from 'src/app/Modules/shared/models/Data/Cupon';
import { CuponesService } from 'src/app/Modules/shared/services/requests/cupones.service';

@Component({
  templateUrl: './listado-cupones.component.html',
  styleUrls: ['./listado-cupones.component.css'],
  animations : [
    loadingAnimation
  ]
})
export class ListadoCuponesComponent  implements OnInit{

  listado_Cupones : Cupon[] = [];
  hasLoaded = true;






  constructor(
    private cupones: CuponesService,
    private router : Router
  ){}


  ngOnInit(){

    this.hasLoaded = false
    this.cupones.getCupones().subscribe(
      (data)=>{
        this.hasLoaded= true;
        this.listado_Cupones = data.filter(item => item.status!=2);
      }
    )
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
