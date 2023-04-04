import { Injectable } from '@angular/core';
import { FormCotizarModel } from '../models/Pages/formCotizar.model';

@Injectable({
  providedIn: 'root'
})
export class cotizacionIntefaceService {
  sharedData: FormCotizarModel = {
    initialDate: '',
    finalDate: '',
    tags: [],
    origen: '',
    listCotizaciones : [],
    email: '',
    telefono: '',
  };
}