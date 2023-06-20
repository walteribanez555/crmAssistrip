import { Component, Input, OnInit } from '@angular/core';
import { Beneficiario } from 'src/app/Modules/shared/models/Data/Beneficiario';
import { MessageResp } from 'src/app/Modules/shared/models/Data/Mensaje';


@Component({
  selector: 'message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() message! : MessageResp;
  @Input() beneficiario! : Beneficiario;


  ngOnInit(): void {

  }



}
