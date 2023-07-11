import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStatus } from '../interfaces';
import { AuthService } from '../../shared/services/auth/auth.service';

// PublicGuard - PrivateGuard

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {



  const authService = inject( AuthService );
  const router      = inject( Router );

  if ( authService.getAuthStatus() === AuthStatus.authenticated ) {
    router.navigateByUrl('/dashboard/cupones/listado-cupones');
    return false;
  }

  return true;
};
