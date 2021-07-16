import { Component } from '@angular/core';
import { NotificationService } from "./notification/notification.service";
import {LoaderService} from './services/loader.service'; 

import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Sherlock';

  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this.loadingService.show();
    }
    if (event instanceof NavigationEnd) {
      this.loadingService.hide();
    }
    if (event instanceof NavigationCancel) {
      this.loadingService.hide();
    }
    if (event instanceof NavigationError) {
      this.loadingService.hide();
    }
  }
  constructor(private router: Router , private loadingService: LoaderService) {
    // tslint:disable-next-line: deprecation
    this.router.events.subscribe((event: Event) => {
        this.navigationInterceptor(event);
        }  );
      }
    }





