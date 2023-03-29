import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, ɵsetAllowDuplicateNgModuleIdsForTest } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Servicio } from '../models/Data/Servicio';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  private apiUrl = '/api/servicios';

  constructor(private http: HttpClient) { }

   getServicios(): Observable<Servicio[]>{

      

      console.log(this.http.get<Servicio[]>(this.apiUrl))

      return this.http.get<Servicio[]>(this.apiUrl);

   }

   getServicioById(id : number): Observable<Servicio>{
      let params = new HttpParams;

      params = params.append('id', id);

      return this.http.get<Servicio>(this.apiUrl, {params});
   }

}
