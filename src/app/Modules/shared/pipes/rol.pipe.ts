import { Pipe, PipeTransform } from '@angular/core';
import { RolService } from '../services/requests/rol.service';
import { Rol } from '../../CRM/modules/usuarios/interfaces/RolComponents.interfaces';
import { RolResp } from '../models/Data/Rol';

@Pipe({
  name: 'rol'
})
export class RolPipe implements PipeTransform {

  listadoRoles : RolResp[] = [];
  constructor(private rolService : RolService){
    this.rolService.getRoles().subscribe(
      data => {
        this.listadoRoles = data;
      }
    )
  }



  transform(value: string): string {



    const idArray = value.split(',').map(id => parseInt(id));
    const roles = this.listadoRoles.filter(role => idArray.includes(role.rol_id));
    const roleNames = roles.map(role => role.rol_name);
    return roleNames.join(',');

  }

}
