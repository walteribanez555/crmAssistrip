import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { switchMap, catchError, throwError } from 'rxjs';
import { Beneficiario } from 'src/app/Modules/shared/models/Data/Beneficiario';
import { Catalogo } from 'src/app/Modules/shared/models/Data/Catalogo';
import { Siniestro } from 'src/app/Modules/shared/models/Data/Siniestro';
import { BeneficiariosService } from 'src/app/Modules/shared/services/requests/beneficiarios.service';
import { CatalogosService } from 'src/app/Modules/shared/services/requests/catalogos.service';

@Component({
  selector: 'siniestro-data',
  templateUrl: './siniestro-data.component.html',
  styleUrls: ['./siniestro-data.component.css']
})
export class SiniestroDataComponent {

  @Input() siniestro! : Siniestro;
  @Output() beneficiarioEmit = new EventEmitter();

  private beneficiarioService  = inject(BeneficiariosService);
  private catalogoService = inject(CatalogosService);
   beneficiario : Beneficiario | null = null;
   tipoBeneficio : Catalogo | null = null;

  ngOnInit(): void {

      this.beneficiarioService.getBeneficiarioById(this.siniestro.beneficiario_id).pipe(
        switchMap(
          data => {
            this.beneficiario = data[0];

            this.beneficiarioEmit.emit(this.beneficiario);


            return this.catalogoService.getBeneficios().pipe(
              catchError( (err)=> {
                return throwError(err);
              })
            )


          }
        )

      ).subscribe(
        {
          next :  ( data  ) => {
            this.tipoBeneficio = data.filter( catalogo => catalogo.catalogo_id === this.siniestro.tipo_siniestro)[0];
          },
          error : ( error ) => {
            console.log(error);
          },
        }

      )
  }


}
