import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {PairupComponent} from './pairup/pairup.component';
import {RouteGuardGuard} from './auth/route-guard.guard';
import {PairupGuard} from './auth/pairup.guard';
import {LoginGuard} from './auth/login.guard' ;
import {GameComponent} from './game/game.component';
import {HomeComponent} from './home/home.component';
import {InstructionsComponent} from './instructions/instructions.component' ;
import {LeaderboardComponent} from './leaderboard/leaderboard.component';
import {ContactsComponent} from './contacts/contacts.component' ;
import {GooglesigninComponent} from './googlesignin/googlesignin.component';
import { ErrorpageComponent} from './errorpage/errorpage.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, pathMatch:'full'},
  {path: 'login', component: LoginComponent , canActivate: [LoginGuard] , pathMatch:'full'},
  {path: 'pairup', component: PairupComponent, canActivate: [PairupGuard], pathMatch:'full'},
  {path: 'game', component: GameComponent, canActivate: [RouteGuardGuard],pathMatch:'full'},
  {path: 'instructions', component: InstructionsComponent, pathMatch:'full'},
  {path: 'leaderboard', component: LeaderboardComponent, canActivate: [RouteGuardGuard],pathMatch:'full'},
  {path: 'contact', component: ContactsComponent,pathMatch:'full'},
  {path: 'googlelogin', component: GooglesigninComponent },
  { path: '**', component:ErrorpageComponent },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
