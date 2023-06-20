import { Component, OnInit, inject } from '@angular/core';
import { catchError, forkJoin, switchMap, tap } from 'rxjs';
import { loadingAnimation } from 'src/app/Modules/shared/animations/loading.animation';
import { Beneficiario } from 'src/app/Modules/shared/models/Data/Beneficiario';
import { Catalogo } from 'src/app/Modules/shared/models/Data/Catalogo';
import { Siniestro } from 'src/app/Modules/shared/models/Data/Siniestro';
import { BeneficiariosService } from 'src/app/Modules/shared/services/requests/beneficiarios.service';
import { CatalogosService } from 'src/app/Modules/shared/services/requests/catalogos.service';
import { SiniestroService } from 'src/app/Modules/shared/services/requests/siniestro.service';

interface SiniestroBeneficiario {
  siniestro : Siniestro,
  beneficiario : Beneficiario,
  tipoBeneficio : Catalogo,
}


@Component({
  templateUrl: './siniestros.component.html',
  styleUrls: ['./siniestros.component.css'],
  animations : [
    loadingAnimation,
  ]
})
export class SiniestrosComponent implements OnInit {


  private siniestroService = inject(SiniestroService);
  private beneficiarioService = inject(BeneficiariosService);
  private catalogoService = inject(CatalogosService);

  listadoSiniestro : Siniestro[] = [];
  listadoBeneficiarios : Beneficiario[] = [];
  listadoCatalogo : Catalogo[]= [];

  siniestros : SiniestroBeneficiario[] = [];


  hasLoaded = true;

  ngOnInit(): void {

    this.hasLoaded = false

    this.siniestroService.getSiniestros().pipe(
      switchMap(
        data => {
          this.listadoSiniestro = data;
          return this.beneficiarioService.getBeneficiario();
        }
      ),
      switchMap(
        data => {
          this.listadoBeneficiarios = data;
          return this.catalogoService.getBeneficios();
        }
      ),


      catchError(
        err   =>  { throw new Error(err)}
      )
    ).subscribe(
      {
        next  :  ( data ) => {
                this.listadoCatalogo = data;
                this.siniestros =  [...this.siniestros, ...this.listadoSiniestro.map(siniestro => {
                  return {
                    siniestro : siniestro,
                    beneficiario : this.listadoBeneficiarios.filter( beneficiario => beneficiario.beneficiario_id === siniestro.beneficiario_id )[0],
                    tipoBeneficio : this.listadoCatalogo.filter( beneficio =>  beneficio.catalogo_id === siniestro.tipo_siniestro)[0],
                  }
                })];
                this.hasLoaded = true
                },
        error :  ( err  ) => { console.log(err) ; this.hasLoaded=true  },


      }

    )


  }

}
