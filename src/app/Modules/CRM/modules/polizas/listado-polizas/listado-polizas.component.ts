import { Component, HostListener, ElementRef,OnInit } from '@angular/core';
import { Poliza } from 'src/app/Modules/shared/models/Data/Poliza';
import { VentaDatos } from 'src/app/Modules/shared/models/Pages/venta_datos.model';
import { ClientesService } from 'src/app/Modules/shared/services/requests/clientes.service';
import { PolizasService } from 'src/app/Modules/shared/services/requests/polizas.service';
import { VentasService } from 'src/app/Modules/shared/services/requests/ventas.service';
import { map, switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado-polizas',
  templateUrl: './listado-polizas.component.html',
  styleUrls: ['./listado-polizas.component.css']
})
export class ListadoPolizasComponent implements OnInit {


  listado_Polizas: Poliza[] = [];


  list_Ventas : VentaDatos[] = [];

  showComponent = false;


  //Obtener las ventas
  
  //Obtener los clientes
  //Obtener los planes




  showDetails(){ 
    this.showComponent = !this.showComponent;
  }


  constructor ( 
    private elRef : ElementRef,
    private polizas: PolizasService,
    private ventas : VentasService,
    private clientes : ClientesService,
    private router : Router,


  ){}

  ngOnInit(): void {

    this.ventas.getVentas().pipe(
      switchMap(ventas => { 
        const request : any = [];
        
        ventas.forEach(
          venta => {
            request.push(
              this.clientes.getClienteById(venta.cliente_id).pipe(
                map(cliente => {
                  return {
                    venta : venta,
                    cliente : cliente
                  }
                })

            )
            )}
        )
        return request;
      }),
      
    ).subscribe(
      data=> {
      }
    )



    
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



  createPolizas(){
    this.router.navigate(['../dashboard/polizas/generar-polizas']);
  }



  
}
