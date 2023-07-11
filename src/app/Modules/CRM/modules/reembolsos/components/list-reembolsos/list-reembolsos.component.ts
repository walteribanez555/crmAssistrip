import { Component, Input, OnInit, inject } from '@angular/core';
import { Reembolso } from 'src/app/Modules/shared/models/Data/Reembolso';
import { ReembolsosService } from 'src/app/Modules/shared/services/requests/reembolsos.service';

@Component({
  selector: 'list-reembolsos',
  templateUrl: './list-reembolsos.component.html',
  styleUrls: ['./list-reembolsos.component.css']
})
export class ListReembolsosComponent implements OnInit {

  private readonly reembolsoService = inject(ReembolsosService);

  listadoReembolsos : Reembolso[] = [];

  constructor(){

  }

  ngOnInit(): void {


    this.reembolsoService.getReembolsos().subscribe(
      {
        next : ( data ) => {
          this.listadoReembolsos = data.filter( reembolso => reembolso.siniestro_id === this.siniestroId);
        },
        error : ( err ) => {

        },
      }
    )



  }




  @Input() siniestroId! : number;




}
