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
    if (!token) {
      const requestWithDefaultToken = req.clone({
        headers: new HttpHeaders({
          Authorization: 'ExternalUser902010',
          schema: 'assist_trip',
        }),
      });
      return next.handle(requestWithDefaultToken);
    } else {
      const requestWithToken = req.clone({
        headers: new HttpHeaders({
          Authorization: token,
          schema: 'assist_trip',
        }),
      });
      return next.handle(requestWithToken);
    }
  }

  private shouldExcludeAuthorizationHeader(req: HttpRequest<any>): boolean {
    // Check if the request URL includes the S3 base URL
    const s3BaseUrl = 'https://assistrip-external-repo.s3.amazonaws.com';
    if (req.url.startsWith(s3BaseUrl)) {
      return true;
    }

    // You can add more conditions based on the request URL or any other criteria here

    return false; // Default to not exclude the Authorization header
  }

}
