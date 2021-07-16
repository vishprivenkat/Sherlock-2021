import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { NotificationService } from '../notification/notification.service';
import {Router} from '@angular/router'; 


@Injectable({
  providedIn: 'root'
})
export class HelperService {  
   isLoading = true;
  constructor(private _notif:NotificationService) { }

  checkLoggedIn(){
    if(localStorage.getItem('PlayerToken'))
    { return true; 

    }
    return false;
  }

checkPaired(){
  if( localStorage.getItem('PairingStatus'))
  {  return true; 

  }
  return false; 
}

loading() {
  return this.isLoading; 
}
showLoader(){
    this.isLoading = true; 
    return this.isLoading;
}

hideLoader(){
  this.isLoading = false; 
  return this.isLoading;
}


performLogout()
{ localStorage.removeItem('PlayerToken'); 
  localStorage.removeItem('PairingStatus'); 
  this._notif.info('INFO: ', 'Player Logged Out. Will be redirected to Home in a few moments'); 

}




}
