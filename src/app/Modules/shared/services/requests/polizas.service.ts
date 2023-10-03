import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Poliza, PolizaResp } from '../../models/Data/Poliza';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PolizasService {


  // private apiUrl = '/api/polizas';
  private apiUrl = environment.apiUrl + '/polizas';

  constructor(private http : HttpClient) { }




  getPolizas() : Observable<Poliza[]>{


    return this.http.get<Poliza[]>(this.apiUrl);
  }

  getPolizasById(id: number) : Observable<Poliza[]>{

    let params = new HttpParams;

    params = params.append('id', id);

    return this.http.get<Poliza[]>(this.apiUrl,{params});

  }


            //  data.ventaId = ventaId;
            // const poliza = await polizas.post( data );
            // poliza.cantidad = cantidad;
            // poliza.precio = precio;
            // poliza.total = total;
            // poliza.descuento = descuento;
            // poliza.totalPago = totalPago;


  postPolizas(venta_id: number, servicio_id : number, destino : string,fecha_salida : string, fecha_retorno : string, extra:number , status : number):Observable<PolizaResp>{


    return this.http.post<PolizaResp>(this.apiUrl, {
      venta_id,
      servicio_id,
      destino,
      fecha_salida,
      fecha_retorno,
      extra,
      status: status,

    })

  }


  putPolizas(poliza_id:number,  fecha_salida : string, fecha_retorno : string, status: number) {
    const urlPut = `${this.apiUrl}?id=${poliza_id}`;
    return this.http.put(urlPut,{
      fecha_salida,
      fecha_retorno,
      status,

    })
  }





}
