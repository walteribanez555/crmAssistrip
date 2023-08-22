import { Component, Input, OnInit } from '@angular/core';
import { getMonthsBetweenDates,  setMensualSiniestros } from '../../utils/dates.Utils';
import { Chart } from 'chart.js';

@Component({
  selector: 'siniestro-month',
  templateUrl: './siniestro-month.component.html',
  styleUrls: ['./siniestro-month.component.css']
})
export class SiniestroMonthComponent implements OnInit {

  @Input() siniestros :any[] = [];

   meses : string[] =[];

  ngOnInit(): void {
   this.meses = getMonthsBetweenDates();

   this.renderChart();

  }


  renderChart(){


    const meses = getMonthsBetweenDates();
    const listadoPorMes = this.meses.map( mes =>{
      const ventaMensual = setMensualSiniestros(this.siniestros, mes);
      return ventaMensual ? ventaMensual : [];
    });


    this.siniestros = listadoPorMes;




    const cantVentas =  listadoPorMes.map( siniestrosMes => siniestrosMes.reduce((total: number, objeto: any) => {

      if(objeto.estado !== "Reembolsado"){
        return total;
      }

      return total + objeto.monto;
    }, 0).toFixed(3));



    const data = {
      labels : meses,
      datasets: [{
        label: "Siniestros reembolsados por mes",
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
