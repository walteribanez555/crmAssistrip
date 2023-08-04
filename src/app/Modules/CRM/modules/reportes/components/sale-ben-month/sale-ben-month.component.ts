import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Beneficiario } from 'src/app/Modules/shared/models/Data/Beneficiario';
import { Poliza } from 'src/app/Modules/shared/models/Data/Poliza';
import { Venta } from 'src/app/Modules/shared/models/Data/Venta.model';

@Component({
  selector: 'sale-ben-month',
  templateUrl: './sale-ben-month.component.html',
  styleUrls: ['./sale-ben-month.component.css']
})
export class SaleBenMonthComponent implements OnInit {

  @Input() ventas! : Venta[];
  @Input() polizas! : Poliza[];
  @Input() beneficiarios! : Beneficiario[];

  @Output() listadoVentasBeneficiario = new EventEmitter();


  beneficiariosFiltered :  Beneficiario[] = [];
  ventasFiltered: Venta[] = [];
  polizasFiltered : Poliza[] = [];


  ngOnInit(): void {

    this.beneficiariosFiltered = this.filterBeneficiariosByState( this.beneficiarios);
    this.polizasFiltered = this.filterPolizasByState(this.polizas);
    this.ventasFiltered = this.filterVentasByState(this.ventas);

    const ventas = this.getVentasByBeneficiario(this.ventasFiltered);


    const ventasDto =ventas.map(venta => {

      const ventasMapped = venta.costoCliente.map( (costo) => { return {
                                                            venta_id : venta.venta.venta_id,
                                                            costo,
                                                            fecha_venta : venta.venta.fecha_venta,
                                                          }});

      return ventasMapped;
    }).flat();


    this.listadoVentasBeneficiario.emit(ventasDto);



    // this.getBeneficiariosAndPrices(this.beneficiariosFiltered, this.polizasFiltered, this.ventasFiltered)

  }


  filterBeneficiariosByState( beneficiarios : Beneficiario[]){

    return beneficiarios;

  }

  filterPolizasByState( polizas : Poliza[] ){

    return polizas.filter( poliza =>  poliza.status !== 3);
  }

  filterVentasByState( ventas : Venta[]){
    return ventas.filter( venta => venta.status !==3);
  }


  getBeneficiariosAndPrices(beneficiarios : Beneficiario[], polizas : Poliza[], ventas : Venta[]){


    const tmp : any[] = [];

    ventas.forEach( venta => {
      const polizasByVenta = polizas.filter( poliza => poliza.venta_id *1 === venta.venta_id *1);
      const beneficiariosByPolizas =    polizasByVenta.map(poliza => beneficiarios.filter( beneciario => beneciario.poliza_id *1  === poliza.poliza_id * 1));


      if(beneficiariosByPolizas.length > 0){
        const beneficiariosPrice = this.getPriceAndBeneficarios( venta, polizasByVenta, beneficiariosByPolizas);
        tmp.push(beneficiariosPrice);
      }


    })
  }


  getPriceAndBeneficarios( venta : Venta , polizas : Poliza[], beneficiarios : Beneficiario[][] ){

    console.log("----------");
    console.log(venta);
    console.log(polizas);
    console.log(beneficiarios);
    console.log("----------");


  }


  getVentasByBeneficiario( ventas : Venta[]){

    const ventasFiltered = ventas.map( venta => {

      const cantClientes = venta.cantidad.split(',').map( cantcliente => +cantcliente);
      const costosClientes = venta.precio.split(',').map( costoCliente => +costoCliente);
      const descuentoClienteGrupo = venta.descuento.split(',').map( descuentoCliente => + descuentoCliente);



      const costoClienteMap = cantClientes.map( (cantCliente, index) => {
        const costo = (costosClientes[index] * cantCliente -  descuentoClienteGrupo[index]) / cantCliente;

        const mapClients = this.getPriceByClient(cantCliente, costo).map( beneficiarioCosto => {
          return{
             totalPagar : +beneficiarioCosto.toFixed(2),
             descuento : +(descuentoClienteGrupo[index]/cantCliente).toFixed(2),
             precioBase : +costosClientes[index].toFixed(2),
          }
        })


        return mapClients;

          // return ({

          //    totalPagar : this.getPriceByClient(cantCliente, costo),
          //    descuento : descuentoClienteGrupo[index],
          //    precioBase : costosClientes[index],

          //   })

         })



      return {
        venta,
        costoCliente : costoClienteMap.flat()
      }

    });

    return ventasFiltered;



  }

  getPriceByClient(cantidad : number, costo : number) {


    // Creamos el array con el tamaño indicado por el número ingresado
    const tamanoArray: number = cantidad;
    const miArray: number[] = [];

    // Realizamos la acción en cada posición
    for (let i = 0; i < tamanoArray; i++) {
      miArray.push(costo);
    }

    return miArray;

  }





}
