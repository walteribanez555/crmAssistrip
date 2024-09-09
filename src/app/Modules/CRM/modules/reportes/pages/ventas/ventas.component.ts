import { Component, OnInit, inject } from '@angular/core';
import { ngxCsv } from 'ngx-csv';
import { Chart,registerables } from 'node_modules/chart.js';
import { map, switchMap } from 'rxjs';
import { Poliza } from 'src/app/Modules/shared/models/Data/Poliza';
import { Venta } from 'src/app/Modules/shared/models/Data/Venta.model';
import { BeneficiariosService } from 'src/app/Modules/shared/services/requests/beneficiarios.service';
import { PolizasService } from 'src/app/Modules/shared/services/requests/polizas.service';
import { VentasService } from 'src/app/Modules/shared/services/requests/ventas.service';
import { addDaysToDate, addOneDayToDate, getMonthsBetweenDates } from '../../utils/dates.Utils';
import { Beneficiario } from 'src/app/Modules/shared/models/Data/Beneficiario';
import { ReportesService } from 'src/app/Modules/shared/services/requests/reportes.service';
// import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";
Chart.register(...registerables);


@Component({
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {



  private readonly ventasService = inject(VentasService);
  private readonly polizaService = inject(PolizasService);
  private readonly beneficiarioService = inject(BeneficiariosService);
  private readonly reportesService = inject(ReportesService);


  listPolizas : Poliza[] = [];
  listVentas : Venta[] = [];
  listBeneficiarios : Beneficiario[] = [];
  isLoaded: boolean = true;
  montoTotal  = 0;
  montoMensual = 0;
  cantidadMensual = 0;
  listVentasMensual : Venta[] = [];
  listadoVentasByBeneficiario = [];
  listadoVentaReporte : any[] = [];


  // meses : string[] = [];

  ngOnInit(): void {
    // this.RenderChart();

    this.isLoaded  = false;

    this.polizaService.getPolizas().pipe(
      switchMap(
        data => {
          this.listPolizas = data;


          return this.beneficiarioService.getBeneficiario();
        }
      ),
      switchMap(
        data => {

          this.listBeneficiarios = data;
          return this.ventasService.getVentas()


        }
      ),
      map(
        data => {
          this.listVentas = data;
          const mapData = data.map( venta => {

            venta.fecha_venta = venta.fecha_venta.split('T')[0];
            const precios = venta.precio.split(',').map( precio => parseFloat(precio));
            venta.precio = this.fixNumbers(precios,3).join(',');

            const total = venta.total.split(',').map( venta => parseFloat(venta));
            venta.total =  this.fixNumbers(total, 3).join(',');


            return{
              venta
            }

          })
          return data;
        }
      )


    ).subscribe(
      {

        // this.makeCsv(data)
        next : ( data ) => {


          // this.meses = getMonthsBetweenDates().reverse();


          this.montoTotal = + this.listVentas.reduce((total: number, objeto: Venta) => {
            return total + objeto.total_pago;
          }, 0).toFixed(3);





           this.listVentasMensual=this.setMensualDetails(this.listVentas);

           this.montoMensual = + this.listVentasMensual.reduce((total: number, objeto: Venta) => {
            return total + objeto.total_pago;
          }, 0).toFixed(3);



          this.isLoaded= true; },
        error : ( err ) => {console.log(err)}
      }
    )


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
    //           servicio : item.servicio,

    //         }
    //       }
    //     )
    //   }
    // )



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


  obtenerDetallePasajero(precio :string, pasajeroEdad : number ){

    const cantDto  = precio.split(',');

    if(cantDto.length===1){
      return cantDto.join(',');
    }

    if(pasajeroEdad >= 75){
      return cantDto[1].toString();
    }

    return cantDto[0].toString();



  }


  obtenerDiferenciaEntreFechas(fecha1: string, fecha2: string): number {

    // console.log(fecha1,fecha2);
    const fechaInicio: Date = new Date(fecha1);
    const fechaFin: Date = new Date(fecha2);

    const diferenciaEnMilisegundos: number = fechaFin.getTime() - fechaInicio.getTime();

    const segundosEnUnDia: number = 24 * 60 * 60 * 1000;
    const diasDeDiferencia: number = Math.floor(diferenciaEnMilisegundos / segundosEnUnDia);

    const anosDeDiferencia: number = diasDeDiferencia / 365.25;
    const anosRedondeados: number = Math.floor(anosDeDiferencia);

    // const diasRestantes: number = Math.floor(diasDeDiferencia - (anosRedondeados * 365.25));

    return anosRedondeados;
  }




  fixNumbers( numbers : number[], roundTo : number ){

    return numbers.map( number => number.toFixed(roundTo))

  }


  toggleReportsBtn(){
    this.makeCsvVen(this.listVentas);
  }


  toggleReporstBeneficiarioBtn(){
    this.makeCsvBen(this.listadoVentaReporte);

  }

  makeCsvBen(data : any[]){

    const nameFile = "reporte ventas-"+new Date().toISOString().split('T')[0];

    var options = {
      fieldSeparator: ';',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Report data',
      useBom: true,
      headers: ["fecha venta","Voucher", "id venta","precio base","descuento","total","origen","destino", "telefono", "email", "nombre","apellido", "identificador","dia nacimiento","fecha salida","fecha retorno","dias", "servicio" ],
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


  makeCsvVen( ventas : Venta[]){

    const nameFile = "reporte ventas-"+new Date().toISOString().split('T')[0];

    var options = {
      fieldSeparator: ';',
      quoteStrings: '"',
      decimalseparator: 'locale',
      showLabels: true,
      showTitle: true,
      title: 'Report data',
      useBom: true,
      headers: ["venta","username","Oficina","cliente","forma pago", "tipo_descuento","fecha_venta","cantidad","precio","total","plus","Tipo descuento","descuento","total pago","status"],
    };

    new ngxCsv(ventas, nameFile, options);


  }


  setMensualDetails( ventas : Venta[]){

    // Get the current date
    const currentDate = new Date();



    // Extract the current month and year
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    ventas = ventas.filter( venta => {

      const ventaFecha = addOneDayToDate(new Date(venta.fecha_venta));
      const monthSale = ventaFecha.getMonth();
      const yearSale = ventaFecha.getFullYear();

      if( monthSale === currentMonth && currentYear=== yearSale){
        return true;
      }
      else{
        return false
      }
    })

    return ventas;


  }


  onLoadVentaBeneficiario( data : any) {


    this.listadoVentasByBeneficiario = data;


  }

}
