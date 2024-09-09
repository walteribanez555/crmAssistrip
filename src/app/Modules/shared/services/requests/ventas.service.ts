import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Venta, VentaResp } from '../../models/Data/Venta.model';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  private apiUrl = environment.apiUrl + '/ventas';


  constructor(private http : HttpClient) {

   }

    // private apiUrl  = '/api/ventas';

    postVenta(cliente_id : number,cantidad : string,descuento : string, tipo_descuento : string,plus : number, servicio_id : string ,fechaSalida : string, fechaRegreso : string, extras_id : string ) : Observable<VentaResp>{


      //   {
      //     "username": "WEBREDCARD",
      //     "office_id": 1,
      //     "cliente_id": 198,
      //     "tipo_venta": 1,
      //     "forma_pago": 1,
      //     "cantidad": "1",
      //     "servicio_id": "5",
      //     "extras_id": "",
      //     "fecha_salida": "2024-02-13",
      //     "fecha_retorno": "2024-02-22",
      //     "status": 2,
      //     "plus": 0,
      //     "descuento": "0",
      //     "tipo_descuento": "2",
      //     "multiviajes": "null"
      // }


        return this.http.post<VentaResp>(this.apiUrl,{
          username : localStorage.getItem('email')!,
          office_id : 2000,
          cliente_id ,
          tipo_venta : 1,
          forma_pago : 1,
          cantidad ,
          tipo_descuento :"2",
          descuento ,
          plus,
          fecha_salida : fechaSalida,
          fecha_retorno : fechaRegreso,
          servicio_id,
          multiviajes : "null",
          extras_id,
          status:1
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


        updateVenta( id : number , status : number){
          const urlPut = `${this.apiUrl}?id=${id}`;
          return this.http.put(urlPut,{
            status : status
          })
        }



        onEdit(id : string | number, data : any) : Observable<any>{
          const url = `https://ut4cimde9b.execute-api.us-east-1.amazonaws.com/dev_v2/products?id=${id}`;

          return this.http.put<any>(url, {
            total_pago : data.total_pago,
            descuento : data.descuento
          });
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


        createIntentPaymentStripe( price : number , details :string) {

          const api = "https://l79xxag4g8.execute-api.us-east-1.amazonaws.com/stripeLambda";

          return this.http.post(api , {price, details});

        }



}
