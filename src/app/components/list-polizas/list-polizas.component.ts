import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Poliza } from 'src/app/models/Data/Poliza';
import { cotizacionIntefaceService } from 'src/app/services/cotizacioninterface.service';
import { PolizasService } from 'src/app/services/polizas.service';

@Component({
  selector: 'app-list-polizas',
  templateUrl: './list-polizas.component.html',
  styleUrls: ['./list-polizas.component.css']
})
export class ListPolizasComponent implements OnInit {



  listIdPolizas : number[] = [];  

  listPolizas : Poliza[] = [];

  constructor(
    private dataService: cotizacionIntefaceService,
    private polizasService : PolizasService,

  ){

  }


  ngOnInit(): void { 


    this.listIdPolizas = this.dataService.listPolizas;    

    forkJoin(
      this.listIdPolizas.map( id => this.polizasService.getPolizasById(id))

    ).subscribe(
      data => {
        this.listPolizas = data;
      }
    )
    

  }

}
