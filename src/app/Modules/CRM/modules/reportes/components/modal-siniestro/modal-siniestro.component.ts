import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Chart } from 'chart.js';
import { Venta } from 'src/app/Modules/shared/models/Data/Venta.model';
import { getNumMonth, convertToYYYYMM, getDaysInMonth, addOneDayToDate } from '../../utils/dates.Utils';

@Component({
  selector: 'modal-siniestro',
  templateUrl: './modal-siniestro.component.html',
  styleUrls: ['./modal-siniestro.component.css']
})
export class ModalSiniestroComponent implements OnInit {


  @Output() closeModal = new EventEmitter();
  @Input() mes! : string
  @Input() siniestros : any[] = [];
  siniestrosByMonthsLists : any[][] = [];

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

        this.renderChart(numDates, this.siniestros);


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





  renderChart( numDates : number, siniestros : any[] ){

    const dates = this.generateArrByNum(numDates);
    // console.log(ventas.reduce((total: number, objeto: Venta) => {
    //   return total + objeto.total_pago;
    // }, 0).toFixed(3));


    this.siniestrosByMonthsLists = dates.map(date =>{
      return siniestros.filter( siniestro => {
        const dateConverted = addOneDayToDate(new Date(siniestro.fecha_siniestro)).getDate()


        if (dateConverted *1 === date*1){
          return siniestro
        }else{
          return null
        }
      })
    });

    console.log(this.siniestrosByMonthsLists);





    const salesByMonths = this.siniestrosByMonthsLists.map( ventasMes => ventasMes.reduce((total: number, objeto: any) => {
      return total + objeto.monto;
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


    }

}
