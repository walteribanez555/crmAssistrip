import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cupon } from '../models/Data/Cupon';

@Injectable({
  providedIn: 'root'
})
export class CuponesService {

  apiUrl = environment.apiUrl + 'cupones'

  constructor(private http : HttpClient) { }


  getCupones(): Observable<Cupon[]>{

    return this.http.get<Cupon[]>(this.apiUrl);

  }

  getCuponById(id : number): Observable<Cupon>{
    let params = new HttpParams;

    params = params.append('id', id);    

    return this.http.get<Cupon>(this.apiUrl, {params});
  }
}
