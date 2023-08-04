import { Component, Input, OnInit } from '@angular/core';
import { Beneficiario } from 'src/app/Modules/shared/models/Data/Beneficiario';
import { addOneDayToDate } from '../../../reportes/utils/dates.Utils';

@Component({
  selector: 'beneficiario',
  templateUrl: './beneficiario.component.html',
  styleUrls: ['./beneficiario.component.css']
})
export class BeneficiarioComponent implements OnInit {


  ngOnInit(): void {

    this.beneficiario.fecha_nacimiento = this.beneficiario.fecha_nacimiento.split('T')[0];
  }


  @Input() beneficiario! : Beneficiario;



}
