import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from '../models/Data/Cliente';


@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  apiUrl : string = environment.apiUrl+'clientes';

  constructor(private http: HttpClient) {
    
   }

  getClientes(): Observable<Cliente[]> { 
    return this.http.get<Cliente[]>(this.apiUrl);
  }


  getClienteById(id : number): Observable<Cliente>{ 
     let params  = new HttpParams;

     params = params.append('id', id);
     
     return this.http.get<Cliente>(this.apiUrl,{params});
  }

}
