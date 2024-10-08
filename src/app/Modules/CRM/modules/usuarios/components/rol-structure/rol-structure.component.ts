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
      area : "Polizas",
      area_permissions : [
        "Agregar",
        "generar-polizas",
       "generar-cotizacion",
       "polizas/:id",
       "polizas/:id/edit",

      ]
    },
    {
      area: "Siniestros",
      area_permissions : [
        "listado-siniestros",
        "siniestro/:id",
      ]
    },
    {
      area : 'Reembolsos',
      area_permissions : [
        "reembolso/:id",
        "listado-reembolso",
      ]
    },
    {
      area : 'Cupones',
      area_permissions : [
        "listado-cupones",
        "cupones/:id",
        "cupones/:id/editar",
        "crear-cupones",
      ]
    },
    {
      area : 'Usuarios y Acceso',
      area_permissions : [
        "agregar-rol",
        "listado-usuarios",
        "agregar-usuarios",
      ]
    },
    {
      area: 'Ventas y Reportes',
      area_permissions : [
        "Ventas",
        "Siniestros",
      ]
    },
    {
      area: 'Marketing',
      area_permissions : [
        "notificaciones",
      ]
    }
  ]





  updateList(data : any){
    this.rolToForm = updateRol(data.action,data.area, data.toAdd, this.rolToForm);

    this.inputControl?.setValue(this.rolToForm);

  }






}
