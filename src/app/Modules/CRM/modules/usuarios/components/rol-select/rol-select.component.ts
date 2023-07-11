import { Component, Input, OnInit, inject } from '@angular/core';
import { RolService } from 'src/app/Modules/shared/services/requests/rol.service';
import { Rol } from '../../interfaces/RolComponents.interfaces';
import { RolResp } from 'src/app/Modules/shared/models/Data/Rol';
import { loadingAnimation } from 'src/app/Modules/shared/animations/loading.animation';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'rol-select',
  templateUrl: './rol-select.component.html',
  styleUrls: ['./rol-select.component.css'],
  animations : [
    loadingAnimation,
  ]
})
export class RolSelectComponent implements OnInit {

  private rolService = inject(RolService);

  @Input() inputControl!: FormControl | null;


  list_roles : RolResp[] = [];

  information : number[]  = [];

  hasLoaded = true;




  constructor(){

  }
  ngOnInit(): void {

    this.hasLoaded= false
    this.rolService.getRoles().subscribe({
      next : ( data ) => {

        this.list_roles = data;





      },
      error : ( err ) =>  {



      },
      complete : ( ) => {

        this.hasLoaded=true;
      }
    })

  }

  onChangeSelect( role : RolResp){



    const index = this.information.indexOf(role.rol_id);

    if (index !== -1) {
      this.information.splice(index, 1);
    }
    else{
      this.information.push( role.rol_id);
    }


    this.inputControl?.setValue(this.information.join(','))


  }

}
