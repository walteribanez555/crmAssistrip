import { Component, Input, OnInit } from '@angular/core';
import { Venta } from 'src/app/Modules/shared/models/Data/Venta.model';

@Component({
  selector: 'char-day',
  templateUrl: './char-day.component.html',
  styleUrls: ['./char-day.component.css']
})
export class CharDayComponent implements OnInit {


  @Input() ventas : Venta[] = [];
  @Input() dia! : number;

  isPar : boolean = false;
  totalMes  : number = 0;


  ngOnInit(): void {


    if(this.dia % 2 === 0){
      this.isPar = true;
    }


    this.totalMes = + this.ventas.reduce((total: number, objeto: Venta) => {
      return total + objeto.total_pago;
    }, 0).toFixed(3);
  }





}
