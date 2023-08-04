import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Reporte } from '../../models/Data/Reporte';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  private apiUrl = environment.apiUrl + '/reporteVentas';


  constructor(
    private readonly http : HttpClient

  ) { }


  getReports() : Observable<Reporte[]>{
    return this.http.get<Reporte[]>(this.apiUrl);
  }
}
