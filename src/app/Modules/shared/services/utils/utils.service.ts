import { Injectable } from '@angular/core';
import { cotizacionDataForm } from '../../models/Pages/cotizacionDataForm.model';
import { FormControl, FormGroup } from '@angular/forms';
import { Servicio } from '../../models/Data/Servicio';
import { Precio } from '../../models/Data/Precio';
import { Cupon } from '../../models/Data/Cupon';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() {}

   //Generar los grupos para los menores de 75 y los mayores de 75
  DivideByAge(listCotizaciones : any[]){
    const cotizaciones : any = [];
    const cotizacionesMayores: any = [];
    let minPlanes =1;


    listCotizaciones.forEach(cotizacion => {
      if(cotizacion.age<75){
        cotizaciones.push(cotizacion);
      }else{
        cotizacionesMayores.push(cotizacion);
      }
    });

    if(cotizacionesMayores.length> 0) {
      minPlanes++;
    }

    return {
      cotizacionesMenores : cotizaciones,
      cotizacionesMayores : cotizacionesMayores,
      minPlanes : minPlanes
    }
  }

  //Comparar las fechas
  compararFechas(initialDate : string, finalDate : string){
    const date1: Date = new Date(initialDate);
    const date2: Date = new Date(finalDate);




      // Get the difference in milliseconds
      const diffInMs = Math.abs(date2.getTime() - date1.getTime());

      // Convert the difference to days
      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

      if(!isNaN(diffInDays)){
        return diffInDays+1;

      }
      return -1;
   }


   //Si el plan tiene los requisitos que en este caso son los paises destinos
   haveRequirements( plan : Servicio, tags : string[]){

    if(!plan.disponibilidad){
      return false;
    }

    const countries : string [] = plan.disponibilidad.split(",");




    return   tags.every((string) => countries.includes(string));
  }


  //Si el plan tiene los requisitos que en este caso son los dias necesarios
  haveRange(servicio : Servicio, diffDays: number, precios : Precio[] ):Boolean{
    const dias : number = diffDays;
      const haveArange : Precio[] =  precios.filter(precio => {
          if(this.betweenTheRange(precio.limite_inferior, precio.limite_superior ,dias)  && precio.servicio_id*1 === servicio.servicio_id*1){
            return true;
          }
          return false;

      });


      if(haveArange.length>0){

        return true


      }


      return false;
  }


   //Crear un nuevo item para las edades
   createItemForm(): FormGroup{
    return new FormGroup({
      age: new FormControl(''),

    });
  }

   //Comprobar de que este en el rango un numero
  betweenTheRange( liInf: number, liSup: number, diffd : number ) : boolean{
    return diffd >= liInf && diffd <= liSup;
  }


  getDate(value : string){
    const date = new Date(value);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}/${month}/${day}`;
  }

  getDateDto(fechaDto : string){
    const fechaString = this.getDate(fechaDto);
    const partesFecha = fechaString.split('/');
    const anio = Number(partesFecha[0]);
    const mes = Number(partesFecha[1]) - 1; // Los meses en JavaScript empiezan en 0
    const dia = Number(partesFecha[2]);
    const fecha = new Date(anio, mes, dia);

    return fecha;

  }

  filterCouponsByDates( listCupones : Cupon[]) : Cupon[]{
    const cupones : Cupon[] =listCupones.filter(
      cupon => {
        const fecha_actual = new Date();
        const fecha_inicial = new Date(cupon.fecha_desde);
        const fecha_final = new Date(cupon.fecha_hasta);


        if( fecha_actual >= fecha_inicial && fecha_actual <= fecha_final){
          return true;
        }

        return false;
      }
    )

    return cupones;


  }


}
