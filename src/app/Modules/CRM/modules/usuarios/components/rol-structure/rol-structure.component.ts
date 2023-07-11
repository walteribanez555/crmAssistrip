import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OptionsRol, RolForm } from '../../interfaces/RolForm.interface';
import { updateRol } from '../../utils/Rols.utils';

@Component({
  selector: 'rol-structure',
  templateUrl: './rol-structure.component.html',
  styleUrls: ['./rol-structure.component.css']
})
export class RolStructureComponent implements OnInit {




  rolToForm : string = JSON.stringify({
    permissions : [

    ]
  });


  ngOnInit(): void {



  }

  @Input() inputControl!: FormControl | null;




  rols : RolForm[] = [
    {
      area : "polizas",
      area_permissions : [
        "Agregar",
        "generar-polizas",
       "generar-cotizacion",
       "polizas/:id",
       "polizas/:id/edit",

      ]
    },
    {
      area: "siniestros",
      area_permissions : [
        "listado-siniestros",
        "siniestro/:id",
      ]
    },
    {
      area : 'reembolso',
      area_permissions : [
        "reembolso/:id",
        "listado-reembolso",
      ]
    },
    {
      area : 'cupones',
      area_permissions : [
        "listado-cupones",
        "cupones/:id",
        "cupones/:id/editar",
        "crear-cupones",
      ]
    },
    {
      area : 'usuarios',
      area_permissions : [
        "agregar-rol",
        "listado-usuarios",
        "agregar-usuarios",
      ]
    }
  ]





  updateList(data : any){
    this.rolToForm = updateRol(data.action,data.area, data.toAdd, this.rolToForm);

    this.inputControl?.setValue(this.rolToForm);

  }






}
