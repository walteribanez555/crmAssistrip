import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { routeSideNav } from 'src/app/Modules/shared/models/Pages/routes.model';
import { AuthService } from 'src/app/Modules/shared/services/auth/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {



  actualDir : string = 'Dashboard';
  lightActive = true;
  darkActive = false;

  @Output() displayNav = new EventEmitter();






  constructor(

    private authService : AuthService,
    private router : Router,){

  }


  toggleSidenav(){
    this.displayNav.emit();
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['../../../auth/login']);
  }


  toggleDarkMode() {
    document.querySelector('body')?.classList.toggle('dark');
    document.querySelector('.darkmode-switch')?.classList.toggle('active');
    this.lightActive = !this.lightActive;
    this.darkActive = !this.darkActive;

  }


}
