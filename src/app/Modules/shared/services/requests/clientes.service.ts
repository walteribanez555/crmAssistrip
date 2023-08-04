import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente, ClientePost, ClienteResp } from '../../models/Data/Cliente';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  // private apiUrl : string = '/api/clientes';
  private headers: HttpHeaders;
  private authService = inject(AuthService);
  private apiUrl = environment.apiUrl + '/clientes';

  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    const token = this.authService.getToken();

    if(token)
        this.headers.set('Authorization',token);



    try{


    }catch(err){
      console.log(err);
    }
  }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }


  getClienteById(id : string): Observable<Cliente[]>{
    let params  = new HttpParams;

    console.log(id);

    params = params.append('id', id);

    return this.http.get<Cliente[]>(this.apiUrl,{params});
 }

  postCliente(cliente : ClientePost) :Observable<ClienteResp>{


    const data = {
      tipo_cliente : 1,
      nombre : cliente.nombre,
      apellido : cliente.apellido,
      nro_identificacion : cliente.nit_ci,
      origen : cliente.origen,
      email : cliente.email,
      nro_contacto : cliente.nro_contacto,
      status: 1,

    }

    return this.http.post<ClienteResp>(this.apiUrl, data).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
      })
    );;

  }






}
