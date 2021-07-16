import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotificationListComponent } from './notification/notification.component';

import { NotificationService } from './notification/notification.service';
import {LoginService} from './services/login.service' ; 
import {HelperService} from './services/helper.service'; 
import { LoaderService} from './services/loader.service'; 
import {LeaderboardService} from './services/leaderboard.service' ; 
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptorService } from './services/loader-interceptor.service';
import { PairupService} from './services/pairup.service' ; 

import { LoginComponent } from './login/login.component';
import { PairupComponent } from './pairup/pairup.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {MatSidenavModule}  from '@angular/material/sidenav'; 
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatListModule} from '@angular/material/list';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SwiperModule } from 'swiper/angular';


import {HttpClientModule} from '@angular/common/http'; 
import {RouteGuardGuard} from './auth/route-guard.guard';
import {PairupGuard} from './auth/pairup.guard'; 
import {LoginGuard} from './auth/login.guard'; 
import { GameComponent } from './game/game.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoaderComponent } from './loader/loader.component';

import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { HomeComponent } from './home/home.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { ReplaceNewLinesPipe } from './replace-new-lines.pipe';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { ContactsComponent } from './contacts/contacts.component';
import { GooglesigninComponent } from './googlesignin/googlesignin.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PairupComponent, 
    NotificationListComponent,
     GameComponent, 
     NavbarComponent, 
     LoaderComponent,
      HomeComponent, 
      InstructionsComponent, 
      ReplaceNewLinesPipe,
       LeaderboardComponent, 
       ContactsComponent, 
       GooglesigninComponent, 
       ErrorpageComponent, 

 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    HttpClientModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule, 
    MatProgressBarModule,
    NgxUsefulSwiperModule,
    MatTableModule,
    MatProgressSpinnerModule

  ],
  providers: [NotificationService, 
    LoginService,
     HelperService,
      PairupService, 
      LeaderboardService, 

     {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
