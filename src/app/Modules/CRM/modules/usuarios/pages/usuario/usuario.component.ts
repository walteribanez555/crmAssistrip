import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { RolResp } from 'src/app/Modules/shared/models/Data/Rol';
import { User } from 'src/app/Modules/shared/models/Data/User.model';
import { RolService } from 'src/app/Modules/shared/services/requests/rol.service';
import { UserService } from 'src/app/Modules/shared/services/requests/user.service';

@Component({
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {



  private route = inject(ActivatedRoute);
  private userService =inject(UserService);
  private rolService = inject(RolService);


  usuarioId = "";
  isLoading : boolean = false;

  usuario : User | null = null;
  rols : RolResp[] = [];


  ngOnInit(): void {
    this.isLoading = true;


    this.route.params.subscribe( params => {
      this.usuarioId = params['id'];

      this.userService.getByUsernameUsers(this.usuarioId).pipe(
        switchMap(
          data => {
            this.usuario = data[0];


            return this.rolService.getRoles()
          }
        )
      ).subscribe({
        next : (data) => {

          const roles =    this.usuario?.rol_id.split(',');
          console.log(roles);
          console.log(data);


           this.rols = data.filter( rol => roles?.includes(rol.rol_id.toString())) ;




          },
        error : (err) => { console.log(err)},
        complete : () => { this.isLoading=false}
      })



    })

  }




  onDelete( ){


  }

}
