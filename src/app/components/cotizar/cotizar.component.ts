import { Component, OnInit } from '@angular/core';
import { FormCotizarModel } from 'src/app/models/Pages/formCotizar.model';
import { cotizacionIntefaceService } from 'src/app/services/cotizacioninterface.service';

@Component({
  selector: 'app-cotizar',
  templateUrl: './cotizar.component.html',
  styleUrls: ['./cotizar.component.css']
})
export class CotizarComponent implements OnInit {

  receivedData: FormCotizarModel= {
    initialDate: '',
    finalDate: '',
    tags: [],
    origen: '',
    listCotizaciones : [],
    email: '',
    telefono: '',

  };
  

  constructor(private dataService: cotizacionIntefaceService) {}

  ngOnInit() {
    this.receivedData = this.dataService.sharedData;

    
  }

}
