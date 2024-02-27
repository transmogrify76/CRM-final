import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private authService: AuthenticationService,private router: Router) {}
  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    if (!(event.target as HTMLElement).closest('.profile-dropdown')) {
      this.closeDropdown();
    }
  }
  logout() {
    const authToken = sessionStorage.getItem('authToken');
    if (authToken) {
      this.authService.logout(authToken as string).subscribe(response => {
        if (response || response.success) {
          this.router.navigate(['/login']);
          sessionStorage.removeItem('authToken'); 
        } else {
          console.error('Logout failed:', response && response.error ? response.error : 'Unknown error');
        }
      }, error => {
        console.error('An error occurred during logout:', error);
      });
    } else {
      console.warn('No auth token found in session storage');
      this.router.navigate(['/login']); 
    }
  
}
}