import { Component, Input, inject } from '@angular/core';
import { Reembolso } from 'src/app/Modules/shared/models/Data/Reembolso';
import { ReembolsosService } from 'src/app/Modules/shared/services/requests/reembolsos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'reembolso',
  templateUrl: './reembolso.component.html',
  styleUrls: ['./reembols.component.css']
})
export class ReembolsoItemComponent {

  @Input() reembolso! : Reembolso ;
  loading : boolean = false;

  private readonly reembolsoService = inject(ReembolsosService);

  constructor(

  ){

  }



  changeState(event: any) {
    const selectedValue = +event.target.value;


    this.reembolso.status = selectedValue;
    console.log(this.reembolso);





  }

  modifyForm(){


    this.loading = true;

    this.reembolsoService.updateReembolsos(
      this.reembolso.reembolso_id,
      this.reembolso
    ).subscribe(
      {
        next : ( data ) => { this.showSuccessNotification()},
        error : (err) => { console.log(err);},
        complete : () => {this.loading = false}
      }
    )

  }

  showSuccessNotification() {
    Swal.fire({
      icon: 'success',
      title: 'Reembolso Actualizado Correctamente',
      text: 'Reembolso Actualizado Correctamente',
      position: 'top-end',
      toast: true,
      timer: 3000,
      showConfirmButton: false
    });
  };

}
