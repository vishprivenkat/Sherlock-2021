import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {LoginService} from '../services/login.service'; 
import {HelperService} from '../services/helper.service'; 
@Injectable({
  providedIn: 'root'
})
export class RouteGuardGuard implements CanActivate {
 constructor(private router: Router, private _helper: HelperService ){}
 
 
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this._helper.checkPaired() && this._helper.checkLoggedIn())
      { return true; }
      else if( !this._helper.checkPaired() && this._helper.checkLoggedIn())
      {  this.router.navigate(['/pairup']);
         
      } 
      else{ 
        this.router.navigate(['/login']);
      }
      return false;

      }

  }


