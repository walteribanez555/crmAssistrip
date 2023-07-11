import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReembolsosService } from 'src/app/Modules/shared/services/requests/reembolsos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'form-reembolso',
  templateUrl: './form-reembolso.component.html',
  styleUrls: ['./form-reembolso.component.css']
})
export class FormReembolsoComponent implements OnInit {


  @Input() siniestro_id! : number;
  @Output() addReembolso = new EventEmitter();



  private readonly reembolsoService = inject(ReembolsosService);


  public reembolsoForm : FormGroup = new FormGroup({
    // propietario_cuenta : new FormControl(null, [Validators.required]),
    // beneficiario_id: new FormControl(null, [Validators.required]),
    // beneficio : new FormControl(null, [Validators.required]),
    // descripcion : new FormControl(null),
    // file  : new FormControl(null),
    nombre_propietario_cuenta : new FormControl(null, Validators.required),
    nro_identificacion : new FormControl(null, Validators.required),
    nro_cuenta : new FormControl(null, Validators.required),
    codigo_swift : new FormControl(null, Validators.required),
    banco : new FormControl(null, Validators.required),
    pais : new FormControl(null, Validators.required),
    ciudad : new FormControl(null, Validators.required),


  })

  ngOnInit(): void {

  }


  submitForm(){
    const { nombre_propietario_cuenta,
            nro_identificacion,
            nro_cuenta,
            codigo_swift,
            banco,
            pais,
            ciudad
           } = this.reembolsoForm.value;

    const siniestro_id = this.siniestro_id;


    this.reembolsoService.postReembolso(
      siniestro_id,
      19,
      nombre_propietario_cuenta,
      nro_identificacion,
      nro_cuenta,
      codigo_swift,
      banco,
      pais,
      ciudad,
      new Date().toISOString().split("T")[0],
      1,
    ).subscribe(
      {
        next: (data) => { this.showSuccessNotification() , this.addReembolso.emit(data)  },
        error : ( err ) => {},
      }
    )


  }

  showSuccessNotification() {
    Swal.fire({
      icon: 'success',
      title: 'Reembolso notificado correctamente',
      text: 'Reembolso notificado correctamente',
      position: 'top-end',
      toast: true,
      timer: 3000,
      showConfirmButton: false
    });
  };



}
