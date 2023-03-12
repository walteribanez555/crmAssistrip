
import { Component, HostListener, ElementRef,OnInit } from '@angular/core';
import { Servicio } from 'src/app/models/Data/Servicio';
import { ServiciosService } from 'src/app/services/servicios.service';
import { trigger,  style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-listado-planes',
  templateUrl: './listado-planes.component.html',
  styleUrls: ['./listado-planes.component.css'],
  animations: [ 
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('500ms ease', style({ transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('500ms ease', style({ transform: 'translateX(100%)' }))
      ])
    ]),

  ]
  
})
export class ListadoPlanesComponent implements OnInit {

  listado_Servicio: Servicio[] = [];

  showComponent = false;

  showDetails() {
    
    this.showComponent = !this.showComponent;
  }

  constructor(
      private elRef: ElementRef,
      private servicios : ServiciosService
      ) {}



      ngOnInit(){
        this.servicios.getServicios().subscribe(
          (data)=> {
            this.listado_Servicio = data.filter(item => item.status === 1);
          })
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

  



}
