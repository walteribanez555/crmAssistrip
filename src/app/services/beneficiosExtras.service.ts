import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Catalogo } from '../models/Data/Catalogo';
import { BeneficioExtra } from '../models/Data/BeneficioExtra.model';

@Injectable({
  providedIn: 'root'
})
export class ExtrasPolizasService {
  
  private apiUrl  = '/api/polizasExtras';

  constructor( private http : HttpClient) { 

   }


   getPolizasExtras(): Observable<BeneficioExtra[]>{
    return this.http.get<BeneficioExtra[]>(this.apiUrl);
   }


   postPolizaExtra(poliza_id : number, beneficio_id: number , monto_adicional: number) {


    return this.http.post(this.apiUrl,{
      poliza_id,
      beneficio_id,
      monto_adicional
    } )

  }

  


  

}
