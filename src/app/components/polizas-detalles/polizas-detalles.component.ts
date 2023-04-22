import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Poliza } from 'src/app/models/Data/Poliza';
import { cotizacionIntefaceService } from 'src/app/services/cotizacioninterface.service';
import { PolizasService } from 'src/app/services/polizas.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-polizas-detalles',
  templateUrl: './polizas-detalles.component.html',
  styleUrls: ['./polizas-detalles.component.css']
})
export class PolizasDetallesComponent implements OnInit {
  
  listIdPolizas: number[] = [];
  listPolizas: Poliza[] = [];


  constructor(
    private dataService: cotizacionIntefaceService,
    private polizasService : PolizasService,
    private router : Router,

  ){

  }


  ngOnInit():void {

    console.log("E iniciado");
    this.listIdPolizas = this.dataService.listPolizas;

    forkJoin(
      this.listIdPolizas.map(id => this.polizasService.getPolizasById(id))
    ).subscribe(
      data => {
        data.forEach(element => {
          this.listPolizas = [...this.listPolizas, ...element];
        });

      }
    )


  }


  mostrarDetalles(idPoliza: number){
    this.router.navigate([`../polizas/poliza/${idPoliza}`]);
  }


  
}
