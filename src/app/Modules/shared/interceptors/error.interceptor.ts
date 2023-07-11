import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpStatusCode
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { errorHandler } from '../handlers/errorHandler.handlers';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private readonly authService : AuthService,
    private router : Router,


  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {



    return next.handle(request).pipe(
      catchError( (error) => {
        console.log(error);

        if( error instanceof HttpErrorResponse){
          if(error.error instanceof ErrorEvent){
            console.log(`Error event`);
          }else {
            const errorType = errorHandler(error);

            switch (errorType){

              case  HttpStatusCode.BadRequest:

                break;

              case  HttpStatusCode.InvalidToken:
                Swal.fire({
                  position: 'top-end',
                  icon: 'info',
                  title: 'Expiro la sesion',
                  // Other Swal.fire() options
                });
                this.authService.logout();
                this.router.navigateByUrl('/auth/login');
                break;
            }

            throw new Error();

          }
        }else{
          console.log('An error ocurred');
        }
        return throwError(()=> new Error(error.statusText))
      })
    )
  }
}


