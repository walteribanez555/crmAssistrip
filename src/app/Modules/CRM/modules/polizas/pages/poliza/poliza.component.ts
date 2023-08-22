import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, map, switchMap } from 'rxjs';
import { Beneficiario } from 'src/app/Modules/shared/models/Data/Beneficiario';
import { Cliente } from 'src/app/Modules/shared/models/Data/Cliente';
import { Poliza } from 'src/app/Modules/shared/models/Data/Poliza';
import { Servicio } from 'src/app/Modules/shared/models/Data/Servicio';
import { Venta } from 'src/app/Modules/shared/models/Data/Venta.model';
import { BeneficiariosService } from 'src/app/Modules/shared/services/requests/beneficiarios.service';
import { ClientesService } from 'src/app/Modules/shared/services/requests/clientes.service';
import { PolizasService } from 'src/app/Modules/shared/services/requests/polizas.service';
import { ServiciosService } from 'src/app/Modules/shared/services/requests/servicios.service';
import { VentasService } from 'src/app/Modules/shared/services/requests/ventas.service';
import Swal from 'sweetalert2';
import { addDaysToDate, addOneDayToDate } from '../../../reportes/utils/dates.Utils';

@Component({
  templateUrl: './poliza.component.html',
  styleUrls: ['./poliza.component.css']
})
export class PolizaComponent implements OnInit{

  private polizaService = inject(PolizasService);
  private beneficiarioService = inject(BeneficiariosService);
  private ventaService = inject(VentasService);
  private route = inject(ActivatedRoute);
  private servicioService = inject(ServiciosService);
  private  router  = inject(Router);


  polizaId = -1;
  loading : boolean = false;
  openModal : boolean = false;


  poliza  : Poliza | null = null;
  venta : Venta | null = null;
  servicio : Servicio | null = null;
  beneficiarios : Beneficiario[] = [];

  ngOnInit(): void {
    this.loading = true;

      this.route.params.subscribe( params => {
        this.polizaId = +params['id'];
        this.polizaService.getPolizasById(this.polizaId).pipe(
          switchMap(
            data => {
                console.log(data);
                this.poliza = data[0];


                return this.ventaService.getVentasById(this.poliza.venta_id)
            }
          ),
          switchMap(
            data => {
                this.venta = data[0];
                return this.beneficiarioService.getBeneficiarioById(this.polizaId);
            }
          ),
          switchMap(
            data => {
              this.beneficiarios = data.map( poliza => {
                poliza.fecha_nacimiento = poliza.fecha_nacimiento.split('T')[0];
                return poliza
              });

              const servicio_id = this.poliza? this.poliza.servicio_id : 0;

              return this.servicioService.getServicioById(servicio_id);
            }
          ),

          switchMap(
            data => {

              this.servicio = data[0];
              const requests : any[] = [];

              if( this.poliza?.status === 0) {

                const salida = new Date(this.poliza.fecha_salida);

                const fechaActual = new Date();
                const fechaAyer = new Date(fechaActual);
                fechaAyer.setDate(fechaActual.getDate() - 1);

                if (salida < fechaAyer){
                  requests.push( this.polizaService.putPolizas(this.poliza.poliza_id, this.poliza.fecha_salida.split('T')[0], this.poliza.fecha_retorno.split('T')[0], 2))
                }
              }
              else{
                if(this.poliza)
                requests.push(this.polizaService.putPolizas(this.polizaId, this.poliza?.fecha_salida.split('T')[0], this.poliza?.fecha_retorno.split('T')[0], this.poliza?.status));

              }



              return forkJoin(requests);
            }
          )


        ).subscribe({

          next :  ( data  ) => {








          },
          error : ( error ) => {
            console.log(error);
          },
          complete : ( ) => {
            this.loading = false;
          }

        })

    })
  }


  modifyPoliza( status : number){


    if(this.poliza)
    this.polizaService.putPolizas(this.poliza.poliza_id, this.poliza.fecha_salida.split('T')[0],this.poliza.fecha_retorno.split('T')[0], status).subscribe({
      next : ( data ) => {
        this.showSuccessNotification();
        this.router.navigate(['dashboard/polizas/listado-polizas'])
      },
      error : ( err ) => {
        this.showError(err);
      }
    })

  }



  showSuccessNotification() {
    Swal.fire({
      icon: 'success',
      title: 'Modificado correctamente',
      text: 'Modificado correctamente',
      position: 'top-end',
      toast: true,
      timer: 3000,
      showConfirmButton: false
    });
  };


  showError(error : string){
    Swal.fire({
      position: 'top-end',
      icon : 'error',
      title: 'No se pudo realizar',
      showConfirmButton: false,
      timer: 1500

    });
  }


}
