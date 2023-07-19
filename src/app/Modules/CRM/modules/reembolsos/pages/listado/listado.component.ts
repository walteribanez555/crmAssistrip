import { Component, inject } from '@angular/core';
import { loadingAnimation } from 'src/app/Modules/shared/animations/loading.animation';
import { Reembolso } from 'src/app/Modules/shared/models/Data/Reembolso';
import { ReembolsosService } from 'src/app/Modules/shared/services/requests/reembolsos.service';

@Component({
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css'],
  animations: [
    loadingAnimation,
  ]
})
export class ListadoComponent {

  private readonly reembolsosServices = inject(ReembolsosService);
  listadoReembolsos : Reembolso[] = [];

  ngOnInit(): void {
    this.hasLoaded = false

    this.reembolsosServices.getReembolsos().subscribe(
      data => {
        console.log(data);
        this.listadoReembolsos = data;
        this.hasLoaded = true
      }
    )


  }

  hasLoaded = true;
}
