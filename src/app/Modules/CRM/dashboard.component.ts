import { ChangeDetectorRef, Component, OnInit,  ElementRef, HostListener, ViewChild} from '@angular/core';
import { routeSideNav } from 'src/app/Modules/shared/models/Pages/routes.model';
import { AuthService } from '../shared/services/auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title = 'assistrip';


  actualDir : string = 'Dashboard';
  display_sidenav = false;
  lightActive = true;
  darkActive = false;








  constructor(
    private cdr : ChangeDetectorRef,
    private elementRef: ElementRef,
    private authService : AuthService,
    private router : Router,){

  }


  ngOnInit(){

    if(!this.authService.isLoggedIn()){
      this.router.navigate(['login']);
    }
  }


  ngOnDestroy() {
  }


  cargarHeader(direccion : string){
    this.actualDir = direccion;
    this.cdr.detectChanges();
  }


  toggleDropdown(menuItem : any) {
    menuItem.isDropdownOpen = !menuItem.isDropdownOpen;
    menuItem.dropdownHeight = menuItem.isDropdownOpen ? menuItem.submenuItems.length * 50 + 'px' : '0';
  }



  closeDropdown(menuItem : any) {
    menuItem.isDropdownOpen = false;
    menuItem.dropdownHeight = '0';
  }

  toggleDarkMode() {
    document.querySelector('body')?.classList.toggle('dark');
    document.querySelector('.darkmode-switch')?.classList.toggle('active');
    this.lightActive = !this.lightActive;
    this.darkActive = !this.darkActive;

  }

  toggleSidenav(){
    this.display_sidenav = !this.display_sidenav;
  }


  logout(){
    this.authService.logout();
    this.router.navigate(['../../../auth/login']);
  }

}
