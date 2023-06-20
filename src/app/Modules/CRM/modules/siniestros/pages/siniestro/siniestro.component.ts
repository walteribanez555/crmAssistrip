import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Beneficiario } from 'src/app/Modules/shared/models/Data/Beneficiario';
import { MessageResp } from 'src/app/Modules/shared/models/Data/Mensaje';
import { Siniestro } from 'src/app/Modules/shared/models/Data/Siniestro';
import { SiniestroService } from 'src/app/Modules/shared/services/requests/siniestro.service';

@Component({
  templateUrl: './siniestro.component.html',
  styleUrls: ['./siniestro.component.css']
})
export class SiniestroComponent {

  private route = inject(ActivatedRoute);
  private siniestrosService = inject(SiniestroService);

  addToChildMessage: Subject<MessageResp> = new Subject<MessageResp>();


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

  onAddMessage( newMessage : MessageResp){
    this.addToChildMessage.next(newMessage);
  }

}
