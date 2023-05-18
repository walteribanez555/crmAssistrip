import { Injectable } from '@angular/core';
import { UserRole } from '../../enums/userRole.enums';

@Injectable({
  providedIn: 'root'
})
export class AuthService {



  private urlLogin : string = '';
  private isAuthenticated: boolean = false;
  private currentUserRole: UserRole | null = null;
  private currentUser : any =null;

  constructor() { }

  login(username: string, password: string): boolean {
    // Authentication logic using the enum UserRole
    if (username === 'walteribanez555@gmail.com' && password === 'Walteribane_8612') {
      this.isAuthenticated = true;
      this.currentUserRole = UserRole.Admin;
      this.currentUser = username;
      localStorage.setItem('token', '123456789')
    }

    if (username === 'user' && password === 'user') {
      this.isAuthenticated = true;
      this.currentUserRole = UserRole.User;
      this.currentUser = username;
      localStorage.setItem('token', '123456789')
    }

    return this.isAuthenticated;


  }

  logout(): void {
    this.isAuthenticated = false;
    this.currentUserRole = null;
    this.currentUser = null;
    localStorage.clear();
  }

  isLoggedIn(): boolean {

    if(!this.isAuthenticated  && !localStorage.getItem('token')  ){
      return false;
    }


    return true;
  }

  getCurrentUserRole(): UserRole | null {
    return this.currentUserRole;
  }

  hasRole(role: UserRole): boolean {
    return this.currentUserRole === role;
  }

  

  

  
}
