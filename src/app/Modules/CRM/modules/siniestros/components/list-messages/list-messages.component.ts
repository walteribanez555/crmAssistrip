import { Component, EventEmitter, Input, OnInit, inject } from '@angular/core';
import { Observable, Subscription, switchMap } from 'rxjs';
import { Beneficiario } from 'src/app/Modules/shared/models/Data/Beneficiario';
import { MessageResp } from 'src/app/Modules/shared/models/Data/Mensaje';
import { Siniestro } from 'src/app/Modules/shared/models/Data/Siniestro';
import { MensajeService } from 'src/app/Modules/shared/services/requests/mensaje.service';

@Component({
  selector: 'list-messages',
  templateUrl: './list-messages.component.html',
  styleUrls: ['./list-messages.component.css']
})
export class ListMessagesComponent implements OnInit {
  private eventsSubscription: Subscription | null = null;

  @Input() events!: Observable<MessageResp>;

  @Input() siniestro! : Siniestro;
  @Input() beneficiario! : Beneficiario;

  loading : boolean = false;

  private mensajesService  = inject(MensajeService);

  listMessages  : MessageResp[] = [];


  ngOnInit(): void {

    this.eventsSubscription = this.events.subscribe(( data :MessageResp ) => {
      this.addMessageToList(data);
    } );

    this.loading = true;
    this.mensajesService.getMensajes().pipe(

    ).subscribe(
      {
        next: (data : MessageResp[]) => {
           data = data.filter( message => message.siniestro_id === this.siniestro.siniestro_id );
           this.listMessages = data;
           this.listMessages = this.listMessages.reverse();
           this.loading = false;
          },
        error : (err : string) => {
          console.log(err);
          this.loading=  false
        },

      }


    )

  }

  addMessageToList(newMessage : MessageResp) {
    this.listMessages.unshift(newMessage);
  }



}
