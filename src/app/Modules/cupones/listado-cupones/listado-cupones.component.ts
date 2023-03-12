
import { Cupon } from 'src/app/models/Data/Cupon';
import { Component, HostListener, ElementRef,OnInit } from '@angular/core';
import { CuponesService } from 'src/app/services/cupones.service';

@Component({
  selector: 'app-listado-cupones',
  templateUrl: './listado-cupones.component.html',
  styleUrls: ['./listado-cupones.component.css']
})
export class ListadoCuponesComponent  implements OnInit{
  
  listado_Cupones : Cupon[] = [];
  showComponent = false;


  showDetails(){
    this.showComponent = !this.showComponent;
  }


  constructor(
    private elRef : ElementRef,
    private cupones: CuponesService
  ){}


  ngOnInit(){
    this.cupones.getCupones().subscribe(
      (data)=>{
        
        this.listado_Cupones = data.filter(item => item.status!=0);
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
