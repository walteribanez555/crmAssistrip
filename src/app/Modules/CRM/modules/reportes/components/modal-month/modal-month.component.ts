import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { addOneDayToDate, convertToYYYYMM, getDaysInMonth, getNumMonth } from '../../utils/dates.Utils';
import { Venta } from 'src/app/Modules/shared/models/Data/Venta.model';
import { Chart } from 'chart.js';

@Component({
  selector: 'modal-month',
  templateUrl: './modal-month.component.html',
  styleUrls: ['./modal-month.component.css']
})
export class ModalMonthComponent implements OnInit {

  @Output() closeModal = new EventEmitter();
  @Input() mes! : string
  @Input() ventas :Venta[] = [];
  salesByMonthsLists : Venta[][] = [];

  constructor(
    private elementRef: ElementRef,


  ){

  }
  ngOnInit(): void {


    const numMonth = getNumMonth(this.mes);
    if(numMonth){
      const dateMonth = convertToYYYYMM(numMonth);

      if(dateMonth){
        const yearMonth= new Date().getFullYear();

        const numDates = getDaysInMonth(numMonth,yearMonth )

        this.renderChart(numDates, this.ventas);


      }


    }





  }





  close(): void {
    this.elementRef.nativeElement.remove();
    this.closeModal.emit();
  }


  generateArrByNum( cant : number) {


    const arr = [];

    for (let i = 1; i <= cant; i++) {
      arr.push(i);
    }

    return arr;

  }





  renderChart( numDates : number, ventas : Venta[] ){

    const dates = this.generateArrByNum(numDates);
    // console.log(ventas.reduce((total: number, objeto: Venta) => {
    //   return total + objeto.total_pago;
    // }, 0).toFixed(3));


    this.salesByMonthsLists = dates.map(date =>{
      return ventas.filter( venta => {
        const dateConverted = addOneDayToDate(new Date(venta.fecha_venta)).getDate()


        if (dateConverted *1 === date*1){
          return venta
        }else{
          return null
        }
      })
    });

    console.log(this.salesByMonthsLists);





    const salesByMonths = this.salesByMonthsLists.map( ventasMes => ventasMes.reduce((total: number, objeto: Venta) => {
      return total + objeto.total_pago;
    }, 0).toFixed(3));


    const data = {
      labels : dates,
      datasets: [{
        label: "Monto de ventas por dias",
        data: salesByMonths,
        borderWidth: 1
      }]


    };

    const myChart = new Chart("ventasMes", {
      type: 'bar',
      data: data,
      options: {

      },

    });



    // const totalVentas = ( salesByMonths.reduce(( total : number, monto : number) => {
    //   return total + monto;
    // },0))



  }

}
