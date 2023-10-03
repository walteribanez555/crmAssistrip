import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Venta, VentaResp } from '../../models/Data/Venta.model';

@Injectable({
  providedIn: 'root'
})
export class VentasService {


    // private apiUrl  = '/api/ventas';


    private apiUrl = environment.apiUrl + '/ventas';


  constructor(private http : HttpClient) {

   }


   postVenta(cliente_id : number,cantidad : string,descuento : string, tipo_descuento : string,plus : number, servicio_id : string ,fechaSalida : string, fechaRegreso : string ,status : number ) : Observable<VentaResp>{



    return this.http.post<VentaResp>(this.apiUrl,{
      username : "raforios",
      officeId : 1,
      cliente_id ,
      tipo_venta : 1,
      forma_pago : 1,
      cantidad ,
      tipo_descuento,
      descuento ,
      plus,
      fecha_salida : fechaSalida,
      fecha_retorno : fechaRegreso,
      servicio_id,
      status:status
    }).pipe(
      map(
        data => data,
      ),
      catchError(
        err => throwError( () => err.error.message)
      )
    )

   }

   getVentas() : Observable<Venta[]>{

      return this.http.get<Venta[]>(this.apiUrl);

    }

    getVentasById( id : number) : Observable<Venta[]>{
      let params = new HttpParams;

      params = params.append('id', id);

      return this.http.get<Venta[]>(this.apiUrl, {params}).pipe(
        map(
          data => {
            if(data.length>0){
              return data;
            }else{
              throw new Error("No se encontro la venta");
            }
        }

        ),
        catchError(
          err =>  throwError( () => err.error.message)
        )
      )


    }


    updateVenta( id : number , status : number){
      const urlPut = `${this.apiUrl}?id=${id}`;
      return this.http.put(urlPut,{
        status : status
      })
    }






}
