import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {HelperService} from '../services/helper.service'
import {NotificationService} from '../notification/notification.service'
@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router, private _helper: HelperService, protected _notification: NotificationService ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      if(!this._helper.checkLoggedIn() || !this._helper.checkPaired())
      { return true; 

      }
      else{
        this._notification.warning('Forbidden:', 'Player Already Logged In!'); 
        this.router.navigate(['/home']);
        return false; 
      }


}
  
}
