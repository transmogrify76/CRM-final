//  import { CanActivateFn } from '@angular/router';

//  export const authGuard: CanActivateFn = (route, state) => {
//   return false;
// };
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
  
    const isAuthenticated = this.checkIfUserIsAuthenticated();

    if (!isAuthenticated) {
    
      console.warn('User is not authenticated. Navigation restricted.');
      this.router.navigate(['/login']); 
      return false;
    }


    return true;
  }

  private checkIfUserIsAuthenticated(): boolean {

    const authToken = sessionStorage.getItem('authToken');
    return !!authToken; 
  }
}


