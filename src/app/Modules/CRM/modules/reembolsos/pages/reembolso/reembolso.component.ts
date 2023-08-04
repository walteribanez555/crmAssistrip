import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Beneficiario } from 'src/app/Modules/shared/models/Data/Beneficiario';
import { MessageResp } from 'src/app/Modules/shared/models/Data/Mensaje';
import { Reembolso, ReembolsoPost } from 'src/app/Modules/shared/models/Data/Reembolso';
import { Siniestro } from 'src/app/Modules/shared/models/Data/Siniestro';
import { SiniestroService } from 'src/app/Modules/shared/services/requests/siniestro.service';

@Component({
  templateUrl: './reembolso.component.html',
  styleUrls: ['./reembolso.component.css']
})
export class ReembolsoComponent implements OnInit  {

  private route = inject(ActivatedRoute);
  private siniestrosService = inject(SiniestroService);

  addToChildReembolso: Subject<Reembolso> = new Subject<Reembolso>();


  loading : boolean = false;

  siniestroId : number = -1;
  siniestro : Siniestro | null = null;
  beneficiario : Beneficiario | null = null;

  ngOnInit(): void {
    this.loading = true;
    this.route.params.subscribe( params => {
        this.siniestroId = +params['id'];
        this.siniestrosService.getSiniestroById(this.siniestroId).subscribe(
          {
            next :  (data)  => { this.loading=false;  this.siniestro = data[0]},
            error : (error) => { this.loading=false;  console.log(error)  }
          }
        )

    }

    )
  }

  haveBeneficiario(beneficiario : Beneficiario){
    this.beneficiario = beneficiario;
  }

  onAddReembolso( newReembolso : Reembolso){
    this.addToChildReembolso.next(newReembolso);
  }



}
