import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStatus } from '../interfaces';
import { AuthService } from '../../shared/services/auth/auth.service';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {


  const authService = inject(AuthService);
  // const navigationService = inject(NavigationService);
  const router = inject(Router);





  if(authService.getAuthStatus() === AuthStatus.authenticated) {


    // if(navigationService.checkLastNavigation()){
    //   const url = navigationService.navigation();

    //   // router.navigateByUrl( url ? url : 'dashboard/polizas-detalles' );
    // }


    return true;
  }



  if(authService.getAuthStatus() === AuthStatus.checking ){
    return false;
  }


  // const url = state.url;
  // localStorage.setItem('path', url);

  router.navigateByUrl('/auth/login');


  return false;


};
