import { Component, Input } from '@angular/core';

@Component({
  selector: 'chart-siniestros',
  templateUrl: './chart-siniestros.component.html',
  styleUrls: ['./chart-siniestros.component.css']
})
export class ChartSiniestrosComponent {

  @Input() siniestros : any[] = [];
  @Input() mes! : string;
  montoTotal : number = 0;

  openModal = false;


  ngOnInit(): void {
    this.montoTotal = + this.siniestros.reduce((total: number, objeto: any) => {
      if(objeto.estado !== "Reembolsado"){
        return total;
      }

      return total + objeto.monto;
    }, 0).toFixed(3);
  }


  displayModal(){


    setTimeout(()=> {
      window.scrollTo(0, 0);
    });
    this.openModal = !this.openModal;


  }


}
