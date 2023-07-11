import { Component, Input } from '@angular/core';
import { Beneficiario } from 'src/app/Modules/shared/models/Data/Beneficiario';

@Component({
  selector: 'beneficiario',
  templateUrl: './beneficiario.component.html',
  styleUrls: ['./beneficiario.component.css']
})
export class BeneficiarioComponent {


  @Input() beneficiario! : Beneficiario;



}
