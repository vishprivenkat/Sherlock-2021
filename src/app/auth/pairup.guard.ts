import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {LoginService} from '../services/login.service'; 
import {HelperService} from '../services/helper.service'; 
@Injectable({
  providedIn: 'root'
})
export class PairupGuard implements CanActivate {
  constructor(private router: Router, private _helper: HelperService ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this._helper.checkLoggedIn() && !this._helper.checkPaired()) 
    { return true; 

    }
    else {
      this.router.navigate(['/home']); 
      return false; 
    }
  } 
  
}
