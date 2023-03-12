import { Poliza } from 'src/app/models/Data/Poliza';
import { Component, HostListener, ElementRef,OnInit } from '@angular/core';
import { PolizasService } from 'src/app/services/polizas.service';


@Component({
  selector: 'app-listado-polizas',
  templateUrl: './listado-polizas.component.html',
  styleUrls: ['./listado-polizas.component.css']
})
export class ListadoPolizasComponent implements OnInit {


  listado_Polizas: Poliza[] = [];

  showComponent = false;



  showDetails(){ 
    this.showComponent = !this.showComponent;
  }


  constructor ( 
    private elRef : ElementRef,
    private polizas: PolizasService,
  ){}

  ngOnInit(): void {
    this.polizas.getPolizas().subscribe(
      (data)=> { 
        this.listado_Polizas = data
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




  
}
