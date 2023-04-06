import { Component, OnInit, AfterViewInit } from '@angular/core';
import { min } from 'rxjs';
import { FormCotizarModel } from 'src/app/models/Pages/formCotizar.model';
import { cotizacionIntefaceService } from 'src/app/services/cotizacioninterface.service';

@Component({
  selector: 'app-cotizar',
  templateUrl: './cotizar.component.html',
  styleUrls: ['./cotizar.component.css']
})
export class CotizarComponent implements OnInit, AfterViewInit {

  receivedData: FormCotizarModel= {
    initialDate: '',
    finalDate: '',
    tags: [],
    origen: '',
    listCotizaciones : [],
    email: '',
    telefono: '',

  };

  private startY = 0;
  private startHeight = 0;
  public itemHeight = 50;
  public maxHeightReached = false;
  public maxHeight = 500;
  public minHeight = 50;
  public minHeightReached = true;



  stateBottom : 1| 2 | 3 = 1;
  

  constructor(private dataService: cotizacionIntefaceService) {}

  ngOnInit() {
    this.receivedData = this.dataService.sharedData;
    
  }
  ngAfterViewInit(): void {
    window.scrollTo(0, 200);
  }

  


  expand(){
    this.itemHeight = this.maxHeight;
    this.minHeightReached = false;
  }
  reducir(){
   this.itemHeight = this.minHeight;
   this.minHeightReached= true;
  }

  
  onTouchStart(event: TouchEvent) {
    // Record the initial touch position and height of the element
    this.startY = event.touches[0].clientY;
    this.startHeight = this.itemHeight;
  }

  
  onTouchMove(event: TouchEvent) {
    this.minHeightReached = false;
    // Calculate the distance between the initial touch position and the current touch position
    const deltaY = event.touches[0].clientY - this.startY;

    // Calculate the new height of the element based on the distance and direction of the drag
    let newHeight = this.startHeight - deltaY;
    newHeight = Math.max(this.minHeight, Math.min(newHeight, this.maxHeight));


    // Update the height of the element
    this.itemHeight = newHeight;
    this.maxHeightReached = newHeight === this.maxHeight;
    this.minHeightReached = newHeight === this.minHeight;
  }


  onTouchEnd(event: TouchEvent) {
    // Clear the initial touch position and height of the element
    this.startY = 0;
    this.startHeight = 0;
  }
}
