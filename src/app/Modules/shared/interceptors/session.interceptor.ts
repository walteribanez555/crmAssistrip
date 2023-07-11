import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpStatusCode } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth/auth.service";
import { Observable, catchError, throwError } from "rxjs";




@Injectable()
export class SessionInterceptor implements HttpInterceptor{

  constructor( private authService : AuthService,
    ){

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      console.log("Paso por aqui");
        const token = this.authService.getToken();
        if(token){
          const requestWithToken = req.clone({
            headers: new HttpHeaders({
              Authorization : token
            })
          });

          return next.handle(requestWithToken)
        }else{
          return next.handle(req);
        }
  }

}
