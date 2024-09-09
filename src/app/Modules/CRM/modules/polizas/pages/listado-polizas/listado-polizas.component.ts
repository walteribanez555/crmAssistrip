import { Component, HostListener, ElementRef,OnInit } from '@angular/core';
import { Poliza } from 'src/app/Modules/shared/models/Data/Poliza';
import { VentaDatos } from 'src/app/Modules/shared/models/Pages/venta_datos.model';
import { ClientesService } from 'src/app/Modules/shared/services/requests/clientes.service';
import { PolizasService } from 'src/app/Modules/shared/services/requests/polizas.service';
import { VentasService } from 'src/app/Modules/shared/services/requests/ventas.service';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
import { Subject, forkJoin, of } from 'rxjs';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/Modules/shared/models/Data/Cliente';
import { Siniestro } from 'src/app/Modules/shared/models/Data/Siniestro';
import { BeneficiariosService } from 'src/app/Modules/shared/services/requests/beneficiarios.service';
import { Beneficiario } from 'src/app/Modules/shared/models/Data/Beneficiario';
import { Servicio } from 'src/app/Modules/shared/models/Data/Servicio';
import { ServiciosService } from 'src/app/Modules/shared/services/requests/servicios.service';
import { loadingAnimation } from 'src/app/Modules/shared/animations/loading.animation';
import { SiniestroService } from 'src/app/Modules/shared/services/requests/siniestro.service';
import { ReportesService } from 'src/app/Modules/shared/services/requests/reportes.service';
import { Reporte } from 'src/app/Modules/shared/models/Data/Reporte';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-listado-polizas',
  templateUrl: './listado-polizas.component.html',
  styleUrls: ['./listado-polizas.component.css'],
  animations : [
    loadingAnimation,
  ]
})
export class ListadoPolizasComponent implements OnInit {

  dateInit : string = "";
  dateEnd : string = "";


  listado_Polizas: Poliza[] = [];
  listado_clientes: Cliente[] = [];
  listado_Siniestros : Siniestro[] = [];
  listado_beneficiarios : Beneficiario[] = [];
  listado_servicios : Servicio[] = [];


  listadoReportes : Reporte[]  = [];
  listFiltReportes : Reporte[] = [];


  listInfo : any[] = [];
  _filteredListInfo : any[] = [];
  filterText : string = "";


  showComponent = false;


  hasLoaded = true;

  searchTermByPoliza$ = new Subject<string>();
  searchTerm$ = new Subject<string>();



  //Obtener las ventas

  //Obtener los clientes
  //Obtener los planes


  searchByPoliza(event: any): void {
    if (event.target.value) {
      this.searchTermByPoliza$.next(event.target.value);
    }
  }


  filterByDates() {
    this.hasLoaded = true;
    console.log({dateInit : this.dateInit, dateEnd : this.dateEnd})

    if(this.dateInit.length === 0 || this.dateEnd.length === 0){
      return
    }

    this.reportesService.get(this.dateInit, this.dateEnd).subscribe(
      data => {
        this.listadoReportes = data;
        this.listFiltReportes = data;
        this.hasLoaded = true;
      }
    )
  }



  showDetails(){
    this.showComponent = !this.showComponent;
  }


  constructor (
    private elRef : ElementRef,
    private polizaServices: PolizasService,
    private clienteServices : ClientesService,
    private siniestroService : SiniestroService,
    private serviciosServices : ServiciosService,
    private beneficiarioService : BeneficiariosService,
    private reportesService : ReportesService,
    private router : Router,


  ){}

  ngOnInit(): void {

    //Obtenemos las polizas, beneficiarios y siniestros
    this.hasLoaded = false;

    this.dateInit = new Date().toISOString().split('T')[0];
    this.dateEnd = new Date().toISOString().split('T')[0];

    this.filterByDates();

    this.serviciosServices.getServicios().subscribe({
      next : ( resp ) => {
        this.listado_servicios = resp;
      },
      error : (err) => {

      },
      complete : () => {

        }
    })


    this.searchTerm$.pipe(
      debounceTime(500), // Adjust the delay time here (in milliseconds)
      distinctUntilChanged(),
      switchMap((term) => {
        console.log({ term });

          if (!term) {
            console.log('No hay info');
          }

          term.length <= 1
              ? (this.listFiltReportes = this.listadoReportes)
              : this.reportesService.getByNroIdentificacion(term).subscribe((resp) => {
                console.log({resp});
                this.listFiltReportes = resp;
              });

          return of();

      })
    ).subscribe((resp) => {})

    this.searchTermByPoliza$
      .pipe(
        debounceTime(500), // Adjust the delay time here (in milliseconds)
        distinctUntilChanged(),
        switchMap((term) => {
          console.log({ term });

          if (!term) {
            console.log('No hay info');
          }

          term.length <= 1
              ? (this.listFiltReportes = this.listadoReportes)
              : this.reportesService.getByNumPoliza(term).subscribe((resp) => {
                this.listFiltReportes = resp;
              });

          return of();
        })
      )
      .subscribe((resp) => {});




    // this.reportesService.

    // this.polizaServices.getPolizas().pipe(
    //   switchMap(
    //     data => {
    //         this.listado_Polizas = data;
    //         // const requests : any[] = [];
    //         // data.forEach(
    //         //   poliza => {

    //         //     requests.push(this.beneficiarioService.getBeneficiarioById(poliza.poliza_id))
    //         //   }
    //         // )


    //         return this.beneficiarioService.getBeneficiario();

    //     }
    //   ),
    //   switchMap(
    //     data => {
    //       this.listado_beneficiarios = data;
    //       return this.siniestroService.getSiniestros()
    //     }
    //   ),
    //   switchMap(
    //     data=> {
    //         this.listado_Siniestros = data;


    //         return this.serviciosServices.getServicios();

    //     }
    //   ),


    // ).subscribe(
    //   data => {

    //     const request : any[] = [];
    //     this.listado_servicios = data;

    //       // this.listado_Polizas = this.listado_Polizas.map( item => {

    //       //   if( item.status === 0) {

    //       //     const salida = new Date(item.fecha_salida);

    //       //     const fechaActual = new Date();
    //       //     const fechaAyer = new Date(fechaActual);
    //       //     fechaAyer.setDate(fechaActual.getDate() - 1);

    //       //     if (salida < fechaAyer){

    //       //       item.status = 2;
    //       //     }

    //       //     return item
    //       //   }

    //       //   return item


    //       // })


    //     //  this.listInfo =this.mapData(this.listado_Polizas,this.listado_beneficiarios, this.listado_Siniestros,this.listado_servicios);
    //      this._filteredListInfo = this.listInfo;
    //      this.hasLoaded = true;

    //   }

    // )






  }


  search(event: any): void {
    if (event.target.value) {
      this.searchTerm$.next(event.target.value);
    }
  }

  mapService(id : number) {
    return this.listado_servicios.find( servicio => servicio.servicio_id === id);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const tableContainer = this.elRef.nativeElement.querySelector('.table-container');
    const tableHeader = tableContainer.querySelector('thead');
    const tableRows = tableContainer.querySelectorAll('tbody tr');

    const containerRect = tableContainer.getBoundingClientRect();
    const headerRect = tableHeader.getBoundingClientRect();
    const lastRowRect = tableRows[tableRows.length - 1].getBoundingClientRect();

    if (containerRect.top + headerRect.height > window.innerHeight ||
        containerRect.bottom - lastRowRect.height < 0) {
      tableHeader.style.visibility = 'hidden';

    } else {
      tableHeader.style.visibility = 'visible';
      for (let i = 0; i < tableRows.length; i++) {
        tableRows[i].style.visibility = 'visible';
      }
    }
  }

  get filterPolizas(){
    return this._filteredListInfo;
  }

  set FilterText(value : string){
    this.filterText = value;

  }

  createPolizas(){
    this.router.navigate(['../dashboard/polizas/generar-polizas']);
  }


  mapData( polizas : Poliza[], beneficiarios : Beneficiario[], siniestros : Siniestro[], servicios : Servicio[]){

    beneficiarios.forEach(beneficiario => {

      const poliza = polizas.find( poliza => poliza.poliza_id === beneficiario.poliza_id)
    });

    const dtoBeneficiarios = beneficiarios.map( beneficiario => {

      const siniestrosBeneficiario = siniestros.filter( siniestro => siniestro.beneficiario_id === beneficiario.beneficiario_id)


      const polizaBeneficiario = polizas.find( poliza => poliza.poliza_id === beneficiario.poliza_id)



      const servicioBeneficiario = servicios.find( servicio=> servicio.servicio_id === polizaBeneficiario?.servicio_id);


      return {
        beneficiario,
        siniestrosBeneficiario,
        polizaBeneficiario,
        servicioBeneficiario,
      }

    })

    console.log(dtoBeneficiarios);


    return dtoBeneficiarios;
  }


  filterByPolizaId( filterTerm : string){

      this._filteredListInfo =  this.listInfo.filter( info =>
        info.polizaBeneficiario.poliza_id.toString().includes(filterTerm)
      )

  }

}
