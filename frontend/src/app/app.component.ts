import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
// export class AppComponent implements OnInit {
//   constructor(private router: Router){
//     setTimeout(() => {
//       this.getCurrentUrl();
//     }, 1000);
//   }
//   urlName:string='';
//   urlFound:boolean=false;

//   ngOnInit() {
  
//   }



//   getCurrentUrl(): boolean {
//     this.urlName = this.router.url;
//     return this.urlName === '/sign-up' || this.urlName === '' || this.urlName === '/login' || this.urlName === '/forgot-password' ;
//   }
  
// }

export class AppComponent {
  hideNavbar: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.hideNavbar = this.shouldHideNavbar(event.url);
      }
    });
  }

  shouldHideNavbar(url: string): boolean {
    return url === '/' || url === '/sign-up' ||  url === '/login' || url === '/forgot-password';
  }
}