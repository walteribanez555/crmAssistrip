import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Reembolso, ReembolsoPost } from '../../models/Data/Reembolso';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReembolsosService {

  constructor(
    private readonly http : HttpClient
  ) { }

  // private apiUrl = '/api/reembolsos';
  private apiUrl = environment.apiUrl + '/reembolsos';

  getReembolsos( ): Observable<Reembolso[]>{
    return this.http.get<Reembolso[]>(this.apiUrl);
  }


  getReembolsosById(id : string): Observable<Reembolso[]>{
    let params  = new HttpParams;

    params = params.append('id', id);

    return this.http.get<Reembolso[]>(this.apiUrl, {params}).pipe(
      map(
        data => {
          if(data.length>0){
            return data;
          }else{
            throw new Error("No se encontro el reembolso");
          }
      }

      ),
      catchError(
        err =>  throwError( () => err.error.message)
      )
    )

  }

  // "siniestro_id" : 59,
  //   "cliente" : 19,
  //   "nombre_propietario_cuenta" :"Walter Ibañez",
  //   "nro_identificacion" : "ABC21314123",
  //   "nro_cuenta" : "12312314",
  //   "codigo_swift" : "3131abc",
  //   "banco" : "Banco Union",
  //   "pais" : "Bolivia",
  //   "ciudad" : "Santa Cruz",
  //   "fecha_emision" : "20",
  //   "status": 1

  postReembolso(  siniestro_id : number,
                  cliente : number,
                  nombre_propietario_cuenta : string,
                  nro_identificacion : string,
                  nro_cuenta : string,
                  codigo_swift : string,
                  banco:  string,
                  pais: string,
                  ciudad : string,
                  fecha_emision : string,
                  status : number,
                  monto : number) : Observable<Reembolso>{

      return this.http.post<Reembolso>(this.apiUrl, {
        siniestro_id,
        cliente,
        nombre_propietario_cuenta,
        nro_identificacion,
        nro_cuenta,
        codigo_swift,
        banco,
        pais,
        ciudad,
        fecha_emision,
        status,
        monto
      }).pipe(
        catchError(
          data => {
            throw new Error(data);
          }
        )
      )


  }


  updateReembolsos(id : number, reembolso : Reembolso){
    const urlPut = `${this.apiUrl}?id=${id}`;
    return this.http.put(urlPut,
      reembolso
    )
  }

  // putPolizas(poliza_id:number,  fecha_salida : string, fecha_retorno : string, status: number) {
  //   const urlPut = `${this.apiUrl}?id=${poliza_id}`;
  //   return this.http.put(urlPut,{
  //     fecha_salida,
  //     fecha_retorno,
  //     status,

  //   })
  // }



}
