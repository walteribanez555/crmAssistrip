import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Venta } from 'src/app/Modules/shared/models/Data/Venta.model';
import { getMonthsBetweenDates, setMensualDetails } from '../../utils/dates.Utils';
import { Chart } from 'chart.js';

@Component({
  selector: 'sale-month',
  templateUrl: './sale-month.component.html',
  styleUrls: ['./sale-month.component.css']
})
export class SaleMonthComponent implements OnInit, AfterViewInit{
  ngAfterViewInit(): void {
    this.renderChart();
  }


  meses : string[] = [];



  @Input() ventas : Venta[] = [];

  listVentasMensual : Venta[] = [];
  listadoVentas : Venta[][] = [];




  ngOnInit(): void {

    // const result =setMensualDetails(this.ventas,this.mes);
  //  this.listVentasMensual = result ? result : [] ;

          this.meses = getMonthsBetweenDates();






  }




  renderChart(){


    const meses = getMonthsBetweenDates();
    const listadoPorMes = meses.map( mes =>{
      const ventaMensual = setMensualDetails(this.ventas, mes);
      return ventaMensual ? ventaMensual : [];
    });

    this.listadoVentas = listadoPorMes;




    const cantVentas =  listadoPorMes.map( ventasMes => ventasMes.reduce((total: number, objeto: Venta) => {
      return total + objeto.total_pago;
    }, 0).toFixed(3));



    const data = {
      labels : meses,
      datasets: [{
        label: "Venta por mes",
        data: cantVentas,


        borderWidth: 1
      }]


    };



    const mes = "byMonth";
    const myChart = new Chart(mes, {
      type: 'bar',
      data: data,
      options: {

      },

    });

    const mesesSecondChart = meses;

    const secondChart = new Chart("byMonthBar", {
      type: 'doughnut',
      data: {

        labels: mesesSecondChart,
        datasets: [{
          data: listadoPorMes.map( ventasMes => ventasMes?.length),
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(235, 64, 52)',
            'rgb(209, 93, 25)',
            'rgb(25, 209, 194)',
            'rgb(25, 43, 209)',
            'rgb(209, 25, 188)',
            'rgb(209, 25, 37)',
            'rgb(54, 204, 35)',
            'rgb(242, 220, 238)',
            'rgb(85, 112, 110)',
            'rgb(49, 66, 92)',
            'rgb(13, 26, 46)',
          ],
        }]
      }

    });

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    if( screenWidth > 768){
      secondChart.canvas.style.width = "250px";
      secondChart.canvas.style.height = "250px";

    }else{

      secondChart.canvas.style.width = "150px";
      secondChart.canvas.style.height = "150px";
    }




  }









}
