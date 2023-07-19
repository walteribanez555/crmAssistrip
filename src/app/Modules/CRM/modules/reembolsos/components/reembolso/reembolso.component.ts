import { Component, Input, inject } from '@angular/core';
import { Reembolso } from 'src/app/Modules/shared/models/Data/Reembolso';
import { ReembolsosService } from 'src/app/Modules/shared/services/requests/reembolsos.service';

@Component({
  selector: 'reembolso',
  templateUrl: './reembolso.component.html',
  styleUrls: ['./reembols.component.css']
})
export class ReembolsoItemComponent {

  @Input() reembolso! : Reembolso ;

  private readonly reembolsoService = inject(ReembolsosService);

  constructor(

  ){

  }



  changeState(event: any) {
    const selectedValue = +event.target.value;





  }

}
