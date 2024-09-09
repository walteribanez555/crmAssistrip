import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, filter, forkJoin, map, switchMap, throwError } from 'rxjs';
import { Catalogo } from 'src/app/Modules/shared/models/Data/Catalogo';
import { Cliente, ClientePost, ClienteResp } from 'src/app/Modules/shared/models/Data/Cliente';
import { Cupon, CuponAplicado } from 'src/app/Modules/shared/models/Data/Cupon';
import { Extra } from 'src/app/Modules/shared/models/Data/Extra';
import { Plan } from 'src/app/Modules/shared/models/Data/Plan';
import { PolizaResp } from 'src/app/Modules/shared/models/Data/Poliza';
import { Precio } from 'src/app/Modules/shared/models/Data/Precio';
import { Servicio } from 'src/app/Modules/shared/models/Data/Servicio';
import { Venta, VentaResp } from 'src/app/Modules/shared/models/Data/Venta.model';
import { cotizacionDataForm } from 'src/app/Modules/shared/models/Pages/cotizacionDataForm.model';
import { datesDestiny } from 'src/app/Modules/shared/models/Pages/datesDestiny.model';
import { extraCostForm } from 'src/app/Modules/shared/models/Pages/extasForm.model';
import { ExtraForm } from 'src/app/Modules/shared/models/Pages/extra.model';
import { policiesData } from 'src/app/Modules/shared/models/Pages/policiesData.model';
import { policiesForm } from 'src/app/Modules/shared/models/Pages/policiesForm.model';
import { GetLocationService } from 'src/app/Modules/shared/services/get-location.service';
import { BeneficiariosService } from 'src/app/Modules/shared/services/requests/beneficiarios.service';
import { ExtrasPolizasService } from 'src/app/Modules/shared/services/requests/beneficiosExtras.service';
import { CatalogosService } from 'src/app/Modules/shared/services/requests/catalogos.service';
import { ClientesService } from 'src/app/Modules/shared/services/requests/clientes.service';
import { CuponesService } from 'src/app/Modules/shared/services/requests/cupones.service';
import { ExtrasService } from 'src/app/Modules/shared/services/requests/extras.service';
import { PlanesService } from 'src/app/Modules/shared/services/requests/planes.service';
import { PolizasService } from 'src/app/Modules/shared/services/requests/polizas.service';
import { PreciosService } from 'src/app/Modules/shared/services/requests/precios.service';
import { ServiciosService } from 'src/app/Modules/shared/services/requests/servicios.service';
import { VentasService } from 'src/app/Modules/shared/services/requests/ventas.service';
import { UtilsService } from 'src/app/Modules/shared/services/utils/utils.service';

import Swal from 'sweetalert2';

// register Swiper custom elements


export interface ExtraUi extends Extra{
  isSelected : boolean;
}


@Component({
  selector: 'app-generar-polizas',
  templateUrl: './generar-polizas.component.html',
  styleUrls: ['./generar-polizas.component.css']
})
export class GenerarPolizasComponent implements OnInit{

  nextId           :     number = 0;
  tags             :   string[] = [];
  paises           : Catalogo[] = [];
  inputValue       :     string = "";
  listadoPlanes    :     Plan[] = [];
  listadoPrecios   :   Precio[] = [];
  listadoServicios : Servicio[] = [];
  listadoExtras    : Extra[] = [];
  listadoCupones   :    Cupon[] = [];
  ListadoServiciosToShow : Servicio[] | null = null;
  ListadoExtrasUi : ExtraUi[] = [];
  ListadoSelectedExtrasUi : ExtraUi[] = [];
  listPolizas      :      any[] = [];
  minDate          :     string = "";
  inputMinDate     :   string = "";
  inputMaxDate     :   string = "";
  selectedPlan : number = 0;
  diffDays : number = 0;
  costo : number =-1;
  listDescuentos : CuponAplicado[] = [];
  status : number = 0;
  statusVenta : number = 0;

  extraTotal : number = 0;


  listVentas: VentaResp[] = [];
  listPolizasResp: PolizaResp[] = [];

  createItemForm(  ): FormGroup {
    return new FormGroup({
      nombres   : new FormControl(null,Validators.required),
      apellidos : new FormControl(null,Validators.required),
      age       : new FormControl(null,Validators.required),
      ci        : new FormControl(null,Validators.required),
      email     : new FormControl(null,Validators.required),
      telf      : new FormControl(null,Validators.required),
      origen    : new FormControl('Bolivia',Validators.required),
      gender    : new FormControl(null, Validators.required)
    });
  }


  constructor(
    private countriesService: CatalogosService,
    private planesServices : PlanesService,
    private preciosServices : PreciosService,
    private serviciosService : ServiciosService,
    private utilsService : UtilsService,
    private cuponesService : CuponesService,
    private catalogoService : CatalogosService,
    private extraService : ExtrasService,

    private clientesService : ClientesService,
    private ventasService : VentasService,
    private polizasService :PolizasService,
    private beneficiariosService : BeneficiariosService,
    private polizasPlusService : ExtrasPolizasService,

    private router : Router,

  ){
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }




  ngOnInit(): void {

    //Agregamos una poliza por defecto
    this.addItem();





    this.countriesService.getPaises().subscribe(
      paises => {
        this.paises = paises;
      }
    )


    this.planesServices.getPlanes().pipe(
      switchMap( planes => {
        this.listadoPlanes = planes;
        return this.preciosServices.getPrecios();
      }),
      switchMap( precios => {
        this.listadoPrecios = precios;
        return this.extraService.getExtras();
      }),
      switchMap( extras => {
        this.ListadoExtrasUi = extras.map( extra => {
          return {
            ...extra,
            isSelected : false
          }
        });

        return this.serviciosService.getServicios();
      }),
      switchMap( servicios=> {
        this.listadoServicios = servicios;
        return this.cuponesService.getCupones();

      })
    ).subscribe(
      cupones => {
        this.listadoCupones = cupones.filter(cupon => cupon.status===1);
        this.listadoCupones = this.utilsService.filterCouponsByDates(this.listadoCupones);


      }

    )

  }

  //Remover del listado de tags
  remove(tag: string) {
    let index = this.tags.indexOf(tag);
    this.tags = [...this.tags.slice(0, index), ...this.tags.slice(index + 1)];


    // this.modifyTags.emit(data);

  }


  //Agregar un tag al listado
  addTag(event: any) {
    if (event.key === 'Enter') {
      let tag = event.target.value.replace(/\s+/g, ' ');
      this.insertTag(tag);
      event.target.value = '';
    }
  }


  selectItem ( item : ExtraUi){
    item.isSelected = !item.isSelected;
  }


  //Proceder a agregar en la lista de tags
  insertTag(tag: string) {
    if(tag!=="pais"){

      if (tag.length > 1 && !this.tags.includes(tag)) {

          tag.split(',').forEach(tag => {
            this.tags.push(tag);
          });

      }
    }
  }

  //Al momento de seleccionar un pais, confirma de que no sea el primero
  onSelect(event: Event) {
    const target = event.target as HTMLSelectElement;
    if (target) {
      const selectedValue = target.value;
      this.insertTag(selectedValue);
      target.value = "pais";
    }

  }


  addItem(){
    const poliza : any = {
      form : this.createItemForm(),
      id : this.nextId++,
      titular : false,
    }

    this.listPolizas.push(poliza);

    this.ListadoServiciosToShow = null;
  }

  removeItem(id: number){
    this.listPolizas = this.listPolizas.filter(poliza => poliza.id !== id);
  }


    generarPlan(){

     const edades : string[] = [];


     this.listPolizas.forEach( poliza => {
        edades.push(poliza.form.value.age);
     })


      const edadesClientes : number[] = this.clientesAge(edades);

      this.diffDays = this.getExactDateDifference(this.inputMinDate,this.inputMaxDate);


      this.ListadoServiciosToShow = this.filterServicesByAge(this.listadoServicios, edadesClientes);


      this.ListadoServiciosToShow = this.filterServicesByPrice(this.ListadoServiciosToShow, this.listadoPrecios, this.diffDays);

    }

    clientesAge( edades : string[] ){


      const ages = edades.map( edad => { return this.calculateAgeDifference(edad)  });


      return ages;
    }


    calculateAgeDifference(birthdate: string): number{
      const currentDate = new Date();
      const birthDate = new Date(birthdate);

      const ageDifference = currentDate.getTime() - birthDate.getTime();
      const ageDifferenceInYears = ageDifference / (1000 * 60 * 60 * 24 * 365.25);

      const ageDifferenceRounded = Math.floor(ageDifferenceInYears);

      return ageDifferenceRounded;
    }

    filterServicesByAge( servicios : Servicio[] , edades : number[] ) : Servicio[]  {

      const serviciosFiltered  = servicios.filter(servicio => {
        for (const edad of edades) {
          if (servicio.edad_base*1 <= edad*1 && servicio.edad_limite*1 >= edad*1) {
            console.log(servicio, edad);
            return true;
          }
        }
        return false;
      });


      return serviciosFiltered;
    }

    filterServicesByPrice( servicios : Servicio[], precios : Precio[], diffDays : number  ):  Servicio[]{

      const servicioIds = servicios.map( servicio => servicio.servicio_id);


      let preciosFiltered = precios.filter( precio => servicioIds.includes(precio.servicio_id));


      preciosFiltered = preciosFiltered.filter( precio => diffDays*1>= precio.limite_inferior*1 && diffDays*1<= precio.limite_superior*1)

      const serviciosFiltered = this.filterServiciosWithoutPrecio(servicios, preciosFiltered);


      return serviciosFiltered;
    }

    getExactDateDifference(date1: string, date2: string): number {
      const parsedDate1 = new Date(date1);
      const parsedDate2 = new Date(date2);

      const timeDifference = Math.abs(parsedDate2.getTime() - parsedDate1.getTime());
      const millisecondsPerDay = 1000 * 60 * 60 * 24;
      const daysDifference = Math.floor(timeDifference / millisecondsPerDay);

      return daysDifference;
    }


   filterServiciosWithoutPrecio(servicios: Servicio[], precios: Precio[]): Servicio[] {
      return servicios.filter(servicio => precios.some(precio => precio.servicio_id === servicio.servicio_id));
    }

    onSelectPlan( ) {


      this.costo = this.utilsService.obtenerCostoPlan(this.listadoPrecios, this.selectedPlan, this.diffDays) * this.listPolizas.length;
      const cuponesAplicables= this.listadoCupones.filter( cupon => cupon.servicio_id*1 === this.selectedPlan*1);


      this.ListadoSelectedExtrasUi = this.ListadoExtrasUi.filter( extra => extra.isSelected == true);


      this.extraTotal = this.ListadoSelectedExtrasUi.reduce((prev,currentExtra) => prev + ( this.costo * currentExtra.incremento / 100 ),0);







      this.listDescuentos = cuponesAplicables.map(
        cuponAplicable => {
          return this.realizarDescuento(this.costo,1, cuponAplicable);
        }
      );





    }

    mapListDescuentos(
      descuentos: CuponAplicado[],
      cantidadPolizas: number,
      servicioMenores: Servicio | null,
      servicioMayores: Servicio | null
    ): string[] {
      // const descuentosMapped : string[] = [];
      // descuentosMapped.push(descuentos.reduce((a, b) => a + b.montoTotal, 0).toString());

      // if(descuentos.length != cantidadPolizas ){
      //   for (let index = 0; index < cantidadPolizas-1; index++) {
      //     descuentosMapped.push('0');
      //   }
      // }

      if (descuentos.length === 0) {
        const descuentosAplicados: string[] = [];

        if (servicioMenores) {
          descuentosAplicados.push('0');
        }

        if (servicioMayores) {
          descuentosAplicados.push('0');
        }

        return descuentosAplicados;
      }

      const descuentosMapped: string[] = this.agruparPorServicioId(
        descuentos
      ).map((listDescuento) => {
        return( listDescuento
          .reduce(
            (accumulator, currentValue) => accumulator + currentValue.montoTotal,
            0
          )/cantidadPolizas)
          .toFixed(3);
      });

      return descuentosMapped;
    }

    agruparPorServicioId(cupones: CuponAplicado[]): CuponAplicado[][] {
      const grupos: { [key: number]: CuponAplicado[] } = {};

      cupones.forEach((cuponAplicado) => {
        const { servicio_id } = cuponAplicado.cupon;
        if (!grupos[servicio_id]) {
          grupos[servicio_id] = [];
        }
        grupos[servicio_id].push(cuponAplicado);
      });

      return Object.values(grupos);
    }

    mapCantDescuentos(descuentos: CuponAplicado[], cantidadPolizas: number) {
      const descuentosMapped: string[] = [];

      for (let index = 0; index < cantidadPolizas; index++) {
        descuentosMapped.push('0');
      }

      return descuentosMapped;
    }

    realizarDescuento( costo : number , cantidad : number, cupon: Cupon ){

          switch (cupon.tipo_valor) {
            case 1:
              return {
                cupon : cupon,
                monto : costo * (cupon.valor/100),
                montoTotal : costo*cantidad * (cupon.valor/100),
              }
            case 2:
              return {
                cupon : cupon,
                monto : cupon.valor,
                montoTotal : cupon.valor* cantidad,
              }
            default:
              return {
                cupon : cupon,
                monto : costo * (cupon.valor/100),
                montoTotal : cupon.valor* cantidad,

              }
          };
    }

    generarVenta(){


      const polizas = this.listPolizas.filter(poliza => poliza.titular==true);


      if(polizas.length!==1){
        this.showErrorMsg("Se necesita que sea un titular obligatoriamente");
        return;
      }



      if(!this.listPolizas.every( poliza => poliza.form.valid)){
        this.showErrorMsg("Revise los datos de cada poliza, el icono marca la poliza con error");
        return;
      }

      Swal.fire({

        text: 'Espere un momento mientras se procesa la informacion',
        imageUrl: 'https://cdn.pixabay.com/animation/2022/10/11/03/16/03-16-39-160_512.gif',

        showConfirmButton : false,
        allowOutsideClick: false,

        imageWidth: 200,
        imageHeight: 200,
        imageAlt: 'Custom image',
      });

      let cliente_id: number = 0;

      const arrcantidad: string[] = [];
      const arrservicios: string[] = [];

      // if (this.datosCotizacionMenores.length > 0 && this.servicioMenores) {
      //   arrcantidad.push(this.datosCotizacionMenores.length.toString());
      //   arrservicios.push(this.servicioMenores.servicio_id.toString());
      // }


      const cantidadDto = arrcantidad.join(',');

      const requests: any[] = [];

      // const listMenoresPolizas: any[] = this.listPolizas.filter(
      //   (poliza) => poliza.type === 1
      // );
      // const listMayoresPolizas: any[] = this.listPolizas.filter(
      //   (poliza) => poliza.type === 2
      // );

      // if (listMenoresPolizas.length > 0) {
      //   requests.push({
      //     listPolizas: listMenoresPolizas,
      //     servicio: this.selectedPlan,
      //   });
      // }
      // if (listMayoresPolizas.length > 0) {
      //   requests.push({
      //     listPolizas: listMayoresPolizas,
      //     servicio: this.servicioMayores?.servicio_id,
      //   });
      // }

      requests.push({
        listPolizas : this.listPolizas,
        servicio : this.selectedPlan
      })


      const descuentosDto = this.mapListDescuentos(
        this.listDescuentos,
        this.listPolizas.length,
        this.listadoServicios.filter(servicio => servicio.servicio_id === this.selectedPlan)[0],
        null,
        // this.servicioMayores,
        // this.servicioMenores
      ).join(',');

      const tipoDescuentosDto = this.mapCantDescuentos(
        this.listDescuentos,
        arrcantidad.length
      ).join(',');

      const serviciosDto = arrservicios.join(',');
      this.clientesService
      .getClienteById(polizas[0].form.value.ci)
      .pipe(
        switchMap((data) => {


          if (data.length > 0) {
            cliente_id = data[0].cliente_id;

            return forkJoin(
              requests[0].listPolizas.map((request : any) => {
                return this.ventasService.postVenta(
                  cliente_id,
                  '1',
                  descuentosDto.length > 0 ? descuentosDto : '0',
                  tipoDescuentosDto,
                  0,
                  this.selectedPlan.toString(),
                  this.inputMinDate,
                  this.inputMaxDate,
                  this.ListadoSelectedExtrasUi.map( extra => extra.beneficio_id).join(',')
                  // this.extrasSelected.map((item) => item.beneficio_id).join(',')

                );
              })
            );
          } else {
            const nuevoCliente: ClientePost = {
              apellido: polizas[0].form.value.apellidos,
              nombre: polizas[0].form.value.nombres,
              ci: polizas[0].form.value.ci,
              origen: polizas[0].form.value.origen,
              email: polizas[0].form.value.email,
              nro_contacto: polizas[0].form.value.telf.value
                ? polizas[0].form.value.telf.value.internationalNumber
                : '',
            };
            // Use `switchMap` to chain the `postCliente` Observable to the `postVenta` Observable
            return this.clientesService
              .postCliente(nuevoCliente)
              .pipe(
                switchMap((data) => {
                  cliente_id = data.id;

                  // this.dataService.titular = data;

                  return forkJoin(
                    requests[0].listPolizas.map((request : any) => {
                      return this.ventasService.postVenta(
                        cliente_id,
                        '1',
                        descuentosDto.length > 0 ? descuentosDto : '0',
                        tipoDescuentosDto,
                        0,
                        this.selectedPlan.toString(),
                        this.inputMinDate,
                        this.inputMaxDate,
                        this.ListadoSelectedExtrasUi.map( extra => extra.beneficio_id).join(',')
                        // this.extrasSelected
                        //   .map((item) => item.beneficio_id)
                        //   .join(',')
                      );
                    })
                  );
                })
              )
              .pipe(
                catchError((err) => {
                  return throwError(err);
                })
              );
          }
        }),
        switchMap((responds) => {
          this.listVentas = responds as VentaResp[];
          const requestsPoliza = (responds as VentaResp[]).map((respond) => {
            return this.polizasService.postPolizas(
              respond.id,
              this.selectedPlan,
              this.tags.join(','),
              this.minDate,
              this.inputMaxDate,
              0
            );
          });

          return forkJoin(requestsPoliza);
        }),
        switchMap((respondPolizas) => {
          this.listPolizasResp = respondPolizas;

          // const polizas: any[] =
          //   listMayoresPolizas.length > 0
          //     ? listMayoresPolizas
          //     : listMenoresPolizas;

          const polizas : any[] = this.listPolizas;

          const requestsBeneficiarios: any[] = [];

          respondPolizas.forEach((response, index) => {
            // this.dataService.listPolizas.push(response.id);

            const names = this.splitFirstWord(
              polizas[index].form.value.nombres
            );

            const firstName = names.firsWord;
            const secondName = names.resOfWord;

            const lastNames = this.splitFirstWord(
              polizas[index].form.value.apellidos
            );

            const firtLastName = lastNames.firsWord;
            const seconLastName = lastNames.resOfWord;

            requestsBeneficiarios.push(
              this.beneficiariosService
                .postBeneficiario(
                  response.id,
                  firtLastName,
                  seconLastName,
                  firstName,
                  secondName,
                  polizas[index].form.value.ci,
                  polizas[index].form.value.age,
                  polizas[index].form.value.gender === 'Masculino' ? '1' : '2 ',
                  polizas[index].form.value.origen,
                  polizas[index].form.value.email.trimEnd(),
                  polizas[index].form.value.telf
                )
                .pipe(
                  map((beneficiario) => {
                    return { response, beneficiario };
                  })
                )
            );

            // const polizas: any[] = response.request.listPolizas;
          });

          return forkJoin(requestsBeneficiarios);
        })
      )
      .subscribe({
        next: (data) => {
          const totalPayment = this.listVentas.reduce(
            (venta, accum) => venta + accum.total_pago,
            0
          ).toFixed(2);

          const details = this.listPolizasResp
            .map((poliza) => poliza.id)
            .join(',');

          console.log({totalPayment, details});

          // this.amount= parseFloat(totalPayment);

          // this.ventasService
          //   // .createIntentPaymentStripe(parseFloat(totalPayment), details)
          //   .createIntentPaymentStripe(parseFloat(totalPayment), details)
          //   .subscribe({
          //     next: (resp : any) => {
          //       this.client_secret = resp.data;
          //       this.stringResp = this.listVentas.map(venta => venta.id).join(',') +'-'+details;
          //       Swal.close();
          //       this.makePayment = true;
          //       this.dataService.haveData = true;
          //     },
          //     error: (error) => {
          //       console.log(error);
          //       this.showErrorMsg(error);
          //     },
          //   });
          Swal.close();

          Swal.fire({
            title: 'Venta registrada correctamente',
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#16F80B',
            cancelButtonColor: '#d33',
            denyButtonText: `Finalizar`,
            confirmButtonText: 'Dirigir a listado',
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              this.router.navigate(['/dashboard/polizas/detail'], {queryParams : {id : this.listPolizasResp.map( poliza => poliza.id).join(',')}});
            } else if (result.isDenied) {
              console.log('Termino');
            }
          });

        },
        error: (error) => {
          console.log(error);
          this.showErrorMsg(error);
        },
      });

      // this.clientesService
      // .getClienteById(polizas[0].form.value.identifier)
      // .pipe(



    }


    showErrorMsg(msg : string){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: msg,
      });
    }

    successMessage(msg : string){
      Swal.close();


      Swal.fire({
        title: 'Venta registrada correctamente',
        icon:  'success',
        text: msg,
        showCancelButton: true,
        confirmButtonColor: '#16F80B',
        cancelButtonColor: '#d33',
        denyButtonText: `Finalizar`,
        confirmButtonText: 'Dirigir a listado',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.router.navigateByUrl('/dashboard/polizas-detalles');

        } else if (result.isDenied) {
          console.log("Termino");
        }
      })


    }



    splitFirstWord(input: string) : {firsWord : string , resOfWord : string} {


      const inputNormalized:  string =  this.normalizeSpaces(input);

      const firstSpaceIndex = inputNormalized.indexOf(' ');

      if (firstSpaceIndex === -1) {
        // No hay espacios en el string, así que se devuelve el string en un array
        return {firsWord : input , resOfWord : ""};
      }

      const firstWord = inputNormalized.slice(0, firstSpaceIndex);
      const restOfString = inputNormalized.slice(firstSpaceIndex + 1);

      return {firsWord : firstWord , resOfWord : restOfString.trimEnd()}
    }

    normalizeSpaces(input: string): string {
      // Dividir el string en palabras, utilizando un espacio como separador
      const words = input.split(' ');

      // Filtrar palabras vacías (espacios adicionales)
      const nonEmptyWords = words.filter(word => word !== '');

      // Unir las palabras con un solo espacio entre ellas
      const normalizedString = nonEmptyWords.join(' ');

      return normalizedString;
    }



    showData(event : any){
      console.log(event);
    }


}
