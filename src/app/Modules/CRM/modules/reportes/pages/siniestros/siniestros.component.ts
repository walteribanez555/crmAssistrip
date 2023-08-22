import { Component, OnInit, inject } from '@angular/core';
import { ngxCsv } from 'ngx-csv';
import { switchMap, map } from 'rxjs';
import { Beneficiario } from 'src/app/Modules/shared/models/Data/Beneficiario';
import { Poliza } from 'src/app/Modules/shared/models/Data/Poliza';
import { Venta } from 'src/app/Modules/shared/models/Data/Venta.model';
import { BeneficiariosService } from 'src/app/Modules/shared/services/requests/beneficiarios.service';
import { PolizasService } from 'src/app/Modules/shared/services/requests/polizas.service';
import { ReportesService } from 'src/app/Modules/shared/services/requests/reportes.service';
import { VentasService } from 'src/app/Modules/shared/services/requests/ventas.service';
import { addDaysToDate, addOneDayToDate } from '../../utils/dates.Utils';
import { SiniestroService } from 'src/app/Modules/shared/services/requests/siniestro.service';
import { ReembolsosService } from 'src/app/Modules/shared/services/requests/reembolsos.service';
import { Siniestro } from 'src/app/Modules/shared/models/Data/Siniestro';
import { Reembolso } from 'src/app/Modules/shared/models/Data/Reembolso';

@Component({
  templateUrl: './siniestros.component.html',
  styleUrls: ['./siniestros.component.css'],
})
export class SiniestrosComponent implements OnInit {
  private readonly ventasService = inject(VentasService);
  private readonly polizaService = inject(PolizasService);
  private readonly beneficiarioService = inject(BeneficiariosService);
  private readonly reportesService = inject(ReportesService);
  private readonly siniestrosService = inject(SiniestroService);
  private readonly reembolsoService = inject(ReembolsosService);

  listPolizas: Poliza[] = [];
  listVentas: Venta[] = [];
  listBeneficiarios: Beneficiario[] = [];
  isLoaded: boolean = true;
  montoTotal = 0;
  montoMensual = 0;
  cantidadMensual = 0;
  listVentasMensual: Venta[] = [];
  listadoVentasByBeneficiario = [];
  listadoVentaReporte: any[] = [];

  listadoSiniestros: Siniestro[] = [];
  listadoReembolsos: Reembolso[] = [];
  dataToShow : any[] = [];


  reembolsos : any[] = [];




  // meses : string[] = [];

  ngOnInit(): void {
    // this.RenderChart();

    this.isLoaded = false;


    this.siniestrosService
      .getSiniestros()
      .pipe(
        switchMap((data) => {
        console.log(data);

          this.listadoSiniestros = data;
          return this.reembolsoService.getReembolsos();
        })
      )
      .subscribe((data) => {
        this.listadoReembolsos = data;

        const resp = this.listadoSiniestros.map((siniestro) => {
          return this.listadoReembolsos.filter(
            (reembolso) => reembolso.siniestro_id === siniestro.siniestro_id
          );
        });

        const dataToCsv: any[] = [];
        resp.forEach((reembolsosBySiniestro, index) => {
          dataToCsv.push({
            siniestro: this.listadoSiniestros[index],
            reembolsosBySiniestro,
          });
        });


        const dataMapped = dataToCsv.map((item : any) => {
          const dataToExport = [];


          if(item.reembolsosBySiniestro.length===0){
            dataToExport.push({
              siniestro : item.siniestro,
              reembolso : null,
            })

          }
          else{

            dataToExport.push(item.reembolsosBySiniestro.map((reembolso: any) => {
              return {
                siniestro: item.siniestro,
                reembolso,
              };
            }));
          }


          return dataToExport.flat();
        });


        const finalData = dataMapped.flat();

        this.dataToShow =  finalData.map( (item) => {

          return {
            beneficiario_id : item.siniestro.beneficiario_id,
            siniestro_id : item.siniestro.siniestro_id,
            reembolso_id : item.reembolso ? item.reembolso.reembolso_id : "no tiene",
            descripcion : item.siniestro.descripcion,
            estado :  item.reembolso ? this.mapState(item.reembolso.status):  "Sin estado",
            monto : item.reembolso ? item.reembolso.monto ? item.reembolso.monto : 0 : 0,
            fecha_siniestro : item.siniestro.fecha_siniestro,
            fecha_emision : item.reembolso? item.reembolso.fecha_emision : "no tiene",
            pais : item.siniestro.pais_ocurrencia,
            ciudad : item.siniestro.ciudad_ocurrencia,

          };
        });



        this.montoTotal = this.dataToShow.reduce((acumulado, transaccion) => {

         if(transaccion.estado=="Reembolsado"){
           return acumulado + transaccion.monto;
         }
         return acumulado;

        }, 0);


        this.reembolsos = this.dataToShow.filter( item => {
          return item.estado=="Reembolsado"
        });


        console.log(this.dataToShow);


        this.isLoaded = true;


      });






    // this.reportesService.getReports().subscribe(
    //  ( data) => {
    //     this.listadoVentaReporte = data.map(
    //       (item ) => {
    //         const fecharetorno = new Date(item.fecha_retorno);
    //         const edadPasajero = this.obtenerDiferenciaEntreFechas(item.fecha_nacimiento, addDaysToDate(fecharetorno,2).toISOString());
    //         const precioPasajero = + this.obtenerDetallePasajero(item.precio, edadPasajero);
    //         const descuentoPasajero = + this.obtenerDetallePasajero(item.descuento, edadPasajero);
    //         const totalPasajero = precioPasajero - descuentoPasajero;
    //         const fechaTransaccion = item.fecha_venta.split('T')[0];

    //         return{
    //           fechaTransaccion,
    //           idBeneficiario : item.beneficiario_id,
    //           idVenta : item.venta_id,
    //           precioPasajero,
    //           descuentoPasajero,
    //           totalPasajero,
    //           origen : item.origen,
    //           destino : item.destino,
    //           telefono : item.telefono,
    //           email : item.email,
    //           nombre : item.primer_nombre,
    //           apellidos : item.primer_apellido,
    //           identificador : item.nro_identificacion,
    //           fecha_nacimiento : item.fecha_nacimiento.split('T')[0],
    //           fecha_salida : item.fecha_salida.split('T')[0],
    //           fecha_retorno : item.fecha_retorno.split('T')[0],
    //           dias_viaje : this.obtenerDiferenciaEnDias(item.fecha_salida, item.fecha_retorno),

    //         }
    //       }
    //     )
    //   }
    // )
  }



  mapState( stateNumber : number ) {


    switch(stateNumber){
      case 1:
        return "En proceso";
        break;
      case 2:
        return "Reembolsado";
        break;
      case 3:
        return "Anulado";
        break;
      default :
        return "Sin estado";
        break;
    }


  }

  obtenerDiferenciaEnDias(fechaInicio: string, fechaFin: string): number {
    const fechaInicioDt = new Date(fechaInicio);
    const fechaFinDt = new Date(fechaFin);

    // Calcula la diferencia entre las fechas en milisegundos
    const diferenciaMs = fechaFinDt.getTime() - fechaInicioDt.getTime();

    // Convierte la diferencia en días
    const diasDiferencia = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));

    return diasDiferencia;
  }

  obtenerDetallePasajero(precio: string, pasajeroEdad: number) {
    const cantDto = precio.split(',');

    if (cantDto.length === 1) {
      return cantDto.join(',');
    }

    if (pasajeroEdad >= 75) {
      return cantDto[1].toString();
    }

    return cantDto[0].toString();
  }

  obtenerDiferenciaEntreFechas(fecha1: string, fecha2: string): number {
    // console.log(fecha1,fecha2);
    const fechaInicio: Date = new Date(fecha1);
    const fechaFin: Date = new Date(fecha2);

    const diferenciaEnMilisegundos: number =
      fechaFin.getTime() - fechaInicio.getTime();

    const segundosEnUnDia: number = 24 * 60 * 60 * 1000;
    const diasDeDiferencia: number = Math.floor(
      diferenciaEnMilisegundos / segundosEnUnDia
    );

    const anosDeDiferencia: number = diasDeDiferencia / 365.25;
    const anosRedondeados: number = Math.floor(anosDeDiferencia);

    // const diasRestantes: number = Math.floor(diasDeDiferencia - (anosRedondeados * 365.25));

    return anosRedondeados;
  }

  fixNumbers(numbers: number[], roundTo: number) {
    return numbers.map((number) => number.toFixed(roundTo));
  }



  toggleReporstBtn() {
    this.makeCsv(this.dataToShow);
  }



  makeCsv(data: any[]) {

    console.log(data);


    const nameFile = 'reporte siniestros-' + new Date().toISOString().split('T')[0];

    var options = {
      fieldSeparator: ';',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Report data',
      useBom: true,
      headers: [
        'beneficiario_id',
        'siniestro_id',
        'reembolso_id',
        'descripcion',
        'estado reembolso',
        'monto',
        'fecha siniestro',
        'fecha reembolso',
        'pais',
        'ciudad',
      ],
    };

    // const dataMapped = data.map( venta => {
    //   return {
    //     venta : venta.venta_id,
    //     fecha_venta : venta.fecha_venta,
    //     precio_base : venta.costo.precioBase,
    //     descuento : venta.costo.descuento,
    //     total : venta.costo.totalPagar
    //   }
    // });

    new ngxCsv(data, nameFile, options);
  }



  setMensualDetails(ventas: Venta[]) {
    // Get the current date
    const currentDate = new Date();

    // Extract the current month and year
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    ventas = ventas.filter((venta) => {
      const ventaFecha = addOneDayToDate(new Date(venta.fecha_venta));
      const monthSale = ventaFecha.getMonth();
      const yearSale = ventaFecha.getFullYear();

      if (monthSale === currentMonth && currentYear === yearSale) {
        return true;
      } else {
        return false;
      }
    });

    return ventas;
  }

  onLoadVentaBeneficiario(data: any) {
    this.listadoVentasByBeneficiario = data;
  }
}
