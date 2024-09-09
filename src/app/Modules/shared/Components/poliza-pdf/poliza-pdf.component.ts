import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Beneficiario } from '../../models/Data/Beneficiario';
import { Poliza } from '../../models/Data/Poliza';
import { Servicio } from '../../models/Data/Servicio';
import { catalogoBeneficio } from '../../models/Pages/catalogoBeneficio.model';

@Component({
  selector: 'poliza-pdf',
  templateUrl: './poliza-pdf.component.html',
  styleUrls: ['./poliza-pdf.component.css']
})
export class PolizaPdfComponent implements AfterViewInit, OnInit{
  ngOnInit(): void {
    this.date = new Date().toLocaleString();


    this.qrCode =`https://www.assistrip.com/landing-page/tu-poliza/${this.poliza.poliza_id}`

  }



  //Al cargar la poliza recien actualizar la informacion.
  ngAfterViewInit(): void {



  }

  date : string = '';
  qrCode : string = '';

  @Input() beneficiario ! : Beneficiario;
  @Input() servicio ! : Servicio;
  @Input() beneficiosMapped : catalogoBeneficio[] =[];
  @Input() poliza! : Poliza;


  @Output()  isLoaded = new EventEmitter<number>()


  onLoadedQr(event :any ){
    this.isLoaded.emit(this.beneficiario.beneficiario_id);


  }




}
