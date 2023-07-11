import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
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
              this.beneficiarios = data;

              const servicio_id = this.poliza? this.poliza.servicio_id : 0;

              return this.servicioService.getServicioById(servicio_id);
            }
          )

        ).subscribe({

          next :  ( data  ) => {
            this.loading = false;

            this.servicio = data[0];


            console.log(this.beneficiarios);
            console.log(this.poliza);
            console.log(this.venta);

          },
          error : ( error ) => {
            console.log(error);
          }

        })

    })
  }



}
