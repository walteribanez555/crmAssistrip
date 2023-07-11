import { Injectable } from '@angular/core';
import { UserRole } from '../../enums/userRole.enums';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { LoginResponse } from './interfaces/login-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private urlLogin : string = '/api-auth/sessions';
  private isAuthenticated: boolean = false;
  private email  : string = "";

  constructor(
    private http  : HttpClient
  ) { }

  login( username: string, password: string ): Observable<boolean> {

    const url  = this.urlLogin;
    const body = { username, password };

    return this.http.post<LoginResponse>( url, body )
      .pipe(
        map( ({sessionToken}) => {  this.isAuthenticated = true  ; this.email = username ; return  this.setAuthentication( sessionToken , username )   }),
        catchError( err => throwError( () => err.error.message ))
      );
    }

  logout(): void {
    this.isAuthenticated = false;
    localStorage.clear();
  }

  isLoggedIn(): boolean {

    if(!this.isAuthenticated  && !localStorage.getItem('sessionToken')  ){
      return false;
    }


    return true;
  }

  // getCurrentUserRole(): UserRole | null {
  //   return this.currentUserRole;
  // }

  // hasRole(role: UserRole): boolean {
  //   return this.currentUserRole === role;
  // }


  private setAuthentication(sessionToken:  string, email : string): boolean {

    localStorage.clear();

    localStorage.setItem('sessionToken', sessionToken);

    localStorage.setItem('email', email);


    return true;
  }


  getEmail( ): string{

    const email = localStorage.getItem('email');

    if(!email) throw new Error( "Email not found");

    return email;

  }

  getToken() : string | null{
    const token = localStorage.getItem('sessionToken');


    return token;

  }

  getAuthStatus() : string{
    const token = localStorage.getItem('sessionToken');

    if(!token) return "notAuthenticated";



    return 'authenticated';
  }





}
