import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fork } from 'child_process';
import { forkJoin, switchMap } from 'rxjs';
import { Beneficiario } from 'src/app/Modules/shared/models/Data/Beneficiario';
import { Poliza } from 'src/app/Modules/shared/models/Data/Poliza';
import { Reporte } from 'src/app/Modules/shared/models/Data/Reporte';
import { BeneficiariosService } from 'src/app/Modules/shared/services/requests/beneficiarios.service';
import { PolizasService } from 'src/app/Modules/shared/services/requests/polizas.service';
import { ReportesService } from 'src/app/Modules/shared/services/requests/reportes.service';

@Component({
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent {
  constructor(
    private route: ActivatedRoute,
    private reporteService: ReportesService,
    private beneficiarioService : BeneficiariosService,
    private polizasService : PolizasService,
  ) {}


  openModal : boolean = true;
  polizasId: number[] = [];

  isLoading : boolean = false;

  listReportes : Reporte[]= [];
  poliza : Poliza | null = null;
  listBeneficiario: Beneficiario[] = [];

  ngOnInit(): void {
    this.isLoading = true;
    const params = this.route.snapshot.queryParams;

    this.polizasId = params['id'].split(',');
    const requests: any[] = [];

    this.polizasId.forEach((id) => {
      requests.push(this.reporteService.getByNumPoliza(id));
    });

    forkJoin(requests).pipe(
      switchMap( resp => {
        this.listReportes = resp.flat();
        const requests = this.listReportes.map(reporte => {  return this.beneficiarioService.getBeneficiarioById(reporte.poliza_id)});

        return forkJoin(requests);
      }),
    ).subscribe((data) => {

      // this.listPolizas = data.flat();
      this.listBeneficiario = data.flat();


    //   poliza_id: number,
    // venta_id: number,
    // servicio_id : number,
    // destino: string,
    // fecha_salida : string,
    // fecha_retorno: string,
    // nro_poliza : number,
    // nro_dias: number,
    // extra: number,
    // fecha_emision : string,
    // status : number,

      const poliza : Poliza = {
        nro_poliza : 1,
        venta_id : this.listReportes[0].venta_id,
        servicio_id : this.listReportes[0].servicio_id,
        destino : this.listReportes[0].destino,
        fecha_salida : this.listReportes[0].fecha_salida,
        fecha_retorno : this.listReportes[0].fecha_retorno,
        nro_dias : this.listReportes[0].nro_dias,
        extra : this.listReportes[0].extra,
        fecha_emision : this.listReportes[0].fecha_venta,
        status : this.listReportes[0].poliza_st,
        poliza_id : this.listReportes[0].poliza_id,

      }

      this.poliza = poliza;

      // console.log({poliza : this.poliza, beneficiarios: this.listBeneficiario})
      this.isLoading = false;


    });



  }


  closeCart(){
    this.openModal = false;
  }
}
