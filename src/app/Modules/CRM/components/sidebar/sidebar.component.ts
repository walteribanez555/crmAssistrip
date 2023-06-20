import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { routeSideNav } from 'src/app/Modules/shared/models/Pages/routes.model';
import { AuthService } from 'src/app/Modules/shared/services/auth/auth.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  title = 'assistrip';



  @Input() actualDir : string = 'Dashboard';
  @Input() display_sidenav = false;
  @Input() lightActive = true;
  @Input() darkActive = false;

  @Output() displayNav = new EventEmitter();


  menuItems : routeSideNav[] = [
    {
      label: 'Usuarios y Acceso',
      isDropdownOpen: false,
      dropdownHeight: '0',
      submenuItems: [
        {
          label: 'Encontrar Usuarios',
          route: 'usuarios/listado-usuarios',
          icon: '',
        },
        {
          label: 'Crear Usuarios',
          icon : 'M11 17h2v-4h4v-2h-4V7h-2v4H7v2h4Zm1 5q-2.075 0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138 1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-2q3.35 0 5.675-2.325Q20 15.35 20 12q0-3.35-2.325-5.675Q15.35 4 12 4 8.65 4 6.325 6.325 4 8.65 4 12q0 3.35 2.325 5.675Q8.65 20 12 20Zm0-8Z',
          route: 'usuarios/agregar-usuarios'
        }
      ]
    },
    // {
    //   label: 'Planes',
    //   isDropdownOpen: false,
    //   dropdownHeight: '0',
    //   submenuItems: [
    //     {
    //       label: 'Encontrar Plan',
    //       route: 'planes/listado-planes',
    //       icon: ''
    //     },
    //     {
    //       label: 'Crear Plan',
    //       route: 'planes/crear-plan',
    //       icon : 'M11 17h2v-4h4v-2h-4V7h-2v4H7v2h4Zm1 5q-2.075 0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138 1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-2q3.35 0 5.675-2.325Q20 15.35 20 12q0-3.35-2.325-5.675Q15.35 4 12 4 8.65 4 6.325 6.325 4 8.65 4 12q0 3.35 2.325 5.675Q8.65 20 12 20Zm0-8Z',

    //     },
    //     {
    //       label: 'Create nueva categoria',
    //       route: 'planes/crear-categoria',
    //       icon : 'M11 17h2v-4h4v-2h-4V7h-2v4H7v2h4Zm1 5q-2.075 0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138 1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-2q3.35 0 5.675-2.325Q20 15.35 20 12q0-3.35-2.325-5.675Q15.35 4 12 4 8.65 4 6.325 6.325 4 8.65 4 12q0 3.35 2.325 5.675Q8.65 20 12 20Zm0-8Z',

    //     },
    //     {
    //       label: 'Crear nueva cobertura',
    //       route: 'planes/crear-cobertura',
    //       icon : 'M11 17h2v-4h4v-2h-4V7h-2v4H7v2h4Zm1 5q-2.075 0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138 1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-2q3.35 0 5.675-2.325Q20 15.35 20 12q0-3.35-2.325-5.675Q15.35 4 12 4 8.65 4 6.325 6.325 4 8.65 4 12q0 3.35 2.325 5.675Q8.65 20 12 20Zm0-8Z',

    //     }
    //   ]
    // },
    {
      label: 'Cupones',
      isDropdownOpen :false,
      dropdownHeight : '0',
      submenuItems: [
        {
          label: 'Buscar cupon',
          route : 'cupones/listado-cupones',
          icon : ''
        },
        {
          label : 'Crear cupon',
          route : 'cupones/crear-cupones',
          icon : 'M11 17h2v-4h4v-2h-4V7h-2v4H7v2h4Zm1 5q-2.075 0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138 1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-2q3.35 0 5.675-2.325Q20 15.35 20 12q0-3.35-2.325-5.675Q15.35 4 12 4 8.65 4 6.325 6.325 4 8.65 4 12q0 3.35 2.325 5.675Q8.65 20 12 20Zm0-8Z',


        }
      ]
    },
    // {
    //   label: 'Campañas de Descuento',
    //   isDropdownOpen: false,
    //   dropdownHeight:'0',
    //   submenuItems: [
    //     {
    //       label: 'Buscar campañas',
    //       route: 'camp-descuentos/listado-camp',
    //       icon : ''
    //     },
    //     {
    //       label: 'Crear campañas',
    //       route : 'camp-descuentos/crear-camp',
    //       icon : 'M11 17h2v-4h4v-2h-4V7h-2v4H7v2h4Zm1 5q-2.075 0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138 1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-2q3.35 0 5.675-2.325Q20 15.35 20 12q0-3.35-2.325-5.675Q15.35 4 12 4 8.65 4 6.325 6.325 4 8.65 4 12q0 3.35 2.325 5.675Q8.65 20 12 20Zm0-8Z',

    //     }
    //   ]

    // },
    {
      label: 'Polizas',
      isDropdownOpen: false,
      dropdownHeight: '0',
      submenuItems: [
        {
          label: 'Buscar pólizas',
          route:'polizas/listado-polizas',
          icon : ''
        },
        {
          label: 'Emitir póliza',
          route: 'polizas/generar-polizas',
          icon : 'M11 17h2v-4h4v-2h-4V7h-2v4H7v2h4Zm1 5q-2.075 0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138 1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-2q3.35 0 5.675-2.325Q20 15.35 20 12q0-3.35-2.325-5.675Q15.35 4 12 4 8.65 4 6.325 6.325 4 8.65 4 12q0 3.35 2.325 5.675Q8.65 20 12 20Zm0-8Z',

        },
        {
          label: 'Crear cotización',
          route: 'polizas/generar-cotizacion',
          icon : 'M11 17h2v-4h4v-2h-4V7h-2v4H7v2h4Zm1 5q-2.075 0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138 1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-2q3.35 0 5.675-2.325Q20 15.35 20 12q0-3.35-2.325-5.675Q15.35 4 12 4 8.65 4 6.325 6.325 4 8.65 4 12q0 3.35 2.325 5.675Q8.65 20 12 20Zm0-8Z',

        }
      ]

    },
    {
      label : 'Siniestros',
      isDropdownOpen: false,
      dropdownHeight : '0',
      submenuItems : [
        {
          label: 'Siniestros',
          route:'siniestro/listado-siniestros',
          icon : ''
        },

      ]
    },
    {
      label : 'reembolsos',
      isDropdownOpen : false,
      dropdownHeight : '0',
      submenuItems : [
        {
          label : 'reembolso',
          route : 'reembolso/listado-reembolso',
          icon : ''
        }
      ]
    }

    // {
    //   label: 'inicio',
    //   isDropdownOpen: false,
    //   dropdownHeight: '0',
    //   submenuItems: [
    //     {
    //       label: 'Banner superior',
    //       route: 'sitio-web/inicio/banner-superior',
    //       icon : ''
    //     },
    //     {
    //       label: 'Carusel principal',
    //       route: 'sitio-web/inicio/carusel-principal',
    //       icon : ''
    //     },
    //     {
    //       label: 'Banner intermedio',
    //       route: 'sitio-web/inicio/banner-intermedio',
    //       icon : ''
    //     },
    //     {
    //       label: 'Como funciona',
    //       route: 'sitio-web/inicio/como-funciona',
    //       icon : ''

    //     },
    //     {
    //       label: 'Banner inferior',
    //       route: 'sitio-web/inicio/banner-inferior',
    //       icon : ''
    //     }


    //   ]
    // },
    // {
    //   label:'Sobre nosotros',
    //   isDropdownOpen: false,
    //   dropdownHeight: '0',
    //   submenuItems: [
    //     {
    //       label:'Texto superior',
    //       route: 'sitio-web/sobre-nosotros/texto-superior',
    //       icon : ''
    //     },
    //     {
    //       label:'Banner intermedio',
    //       route: 'sitio-web/sobre-nosotros/banner-intermedio',
    //       icon : ''
    //     },
    //   ]

    // },
    // {
    //   label:'Ayuda',
    //   isDropdownOpen: false,
    //   dropdownHeight:'0',
    //   submenuItems: [
    //     {
    //       label:'Preguntas',
    //       route:'sitio-web/ayuda/preguntas',
    //       icon : ''
    //     },
    //     {
    //       label:'Contacto',
    //       route: 'sitio-web/ayuda/contacto',
    //       icon : ''
    //     },
    //     {
    //       label: 'Redes sociales',
    //       route: 'sitio-web/ayuda/redes-sociales',
    //       icon : ''

    //     }

    //   ]
    // }





  ];


  constructor(
    private cdr : ChangeDetectorRef,
    private authService : AuthService,
    private router : Router,){

  }


  ngOnInit(){

    if(!this.authService.isLoggedIn()){
      this.router.navigate(['login']);
    }
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
    this.displayNav.emit();
  }




}
