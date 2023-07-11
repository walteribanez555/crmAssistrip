import { Component, OnInit, inject } from '@angular/core';
import { loadingAnimation } from 'src/app/Modules/shared/animations/loading.animation';
import { User } from 'src/app/Modules/shared/models/Data/User.model';
import { UserService } from 'src/app/Modules/shared/services/requests/user.service';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.css'],
  animations : [
    loadingAnimation
  ]
})
export class ListadoUsuariosComponent implements OnInit {

  hasLoaded  = true;

  private readonly userService = inject(UserService);

  users : User[] = [];


  constructor() {

  }
  ngOnInit(): void {
    this.hasLoaded = false;
    this.userService.getUsers().subscribe(
      {
        next : ( data ) => {
          this.users = data;
        },
        error : (err) => {
          console.log(err);

        },
        complete : () => {
          this.hasLoaded = true;
        }

      }
    )


  }







}
