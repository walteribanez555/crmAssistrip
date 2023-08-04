import { Component, Input, OnInit } from '@angular/core';
import { Venta } from 'src/app/Modules/shared/models/Data/Venta.model';

@Component({
  selector: 'char-month',
  templateUrl: './char-month.component.html',
  styleUrls: ['./char-month.component.css']
})
export class CharMonthComponent implements OnInit {

  @Input() ventas : Venta[] = [];
  @Input() mes! : string;
  montoTotal : number = 0;

  openModal = false;


  ngOnInit(): void {
    this.montoTotal = + this.ventas.reduce((total: number, objeto: Venta) => {
      return total + objeto.total_pago;
    }, 0).toFixed(3);
  }


  displayModal(){


    setTimeout(()=> {
      window.scrollTo(0, 0);
    });
    this.openModal = !this.openModal;


  }



}
