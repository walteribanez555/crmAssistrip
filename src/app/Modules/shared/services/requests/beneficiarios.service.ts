import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Beneficiario, BeneficiarioResp } from '../../models/Data/Beneficiario';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class BeneficiariosService {
  constructor(private http: HttpClient) {}

  // private apiUrl  = '/api/beneficiarios';
  private apiUrl = environment.apiUrl + '/beneficiarios';

  getBeneficiario(): Observable<Beneficiario[]> {
    return this.http.get<Beneficiario[]>(this.apiUrl);
  }

  getBeneficiarioById(id: number): Observable<Beneficiario[]> {
    let params = new HttpParams();

    params = params.append('id', id);

    return this.http.get<Beneficiario[]>(this.apiUrl, { params });
  }

  // {
  //   "poliza_id": 1,
  //   "primer_apellido": "Lopez",
  //   "segundo_apellido": "Perez",
  //   "primer_nombre": "Carlos",
  //   "segundo_nombre": "",
  //   "ci": "1234567",
  //   "pasaporte": "1234567",
  //   "fecha_nacimiento": "1980-01-20",
  //   "sexo": 1,
  //   "origen": "Bolivia",
  //   "email": "carlosœgmail.com",
  //   "telefono": "34343456"
  // }

  postBeneficiario(
    poliza_id: number,
    primer_apellido: string,
    segundo_apellido: string,
    primer_nombre: string,
    segundo_nombre: string,
    identifier: string,
    fecha_nacimiento: string,
    sexo: string,
    origen: string,
    email: string,
    telefono: string
  ): Observable<BeneficiarioResp> {
    return this.http
      .post<BeneficiarioResp>(this.apiUrl, {
        poliza_id,
        primer_apellido: primer_apellido + ' ' + segundo_apellido,
        segundo_apellido: ' ',
        primer_nombre: primer_nombre + ' ' + segundo_nombre,
        segundo_nombre: ' ',
        nro_identificacion: identifier,
        fecha_nacimiento,
        sexo,
        origen,
        email,
        telefono,
      })
      .pipe(
        map((data) => data),
        catchError((err) => throwError(() => err.error.message))
      );
  }

  // console.log(cliente_id, nombres, apellidos, age, ci, email, telf, origen, gender);
  updateBeneficiario(
    beneficiario_id: number,
    primer_nombre: string,
    segundo_nombre: string,
    primer_apellido: string,
    segundo_apellido: string,
    ci: string,
    email: string,
    telf: string,
    origen: string,
    gender: number,
    age: string
  ) {
    return this.http.put(`${this.apiUrl}?id=${beneficiario_id}`, {
      primer_apellido: primer_apellido + ' ' + segundo_apellido,
      segundo_apellido: ' ',
      primer_nombre: primer_nombre + ' ' + segundo_nombre,
      segundo_nombre: ' ',
      nro_identificacion: ci,
      email,
      telf,
      origen,
      gender,
      fecha_nacimiento: age,
    });
  }
}
