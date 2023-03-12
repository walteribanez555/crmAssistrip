import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Poliza } from '../models/Data/Poliza';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PolizasService {


  apiUrl = environment.apiUrl + 'polizas';

  constructor(private http : HttpClient) { }




  getPolizas() : Observable<Poliza[]>{


    return this.http.get<Poliza[]>(this.apiUrl);
  }

  getPolizasById(id: number) : Observable<Poliza>{

    let params = new HttpParams;

    params = params.append('id', id);

    return this.http.get<Poliza>(this.apiUrl,{params});



  }
  


}
