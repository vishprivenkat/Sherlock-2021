import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import {  throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Observable} from 'rxjs';
import { NotificationService } from '../notification/notification.service';
import {Router} from '@angular/router'; 
import {HelperService} from './helper.service'; 
import {environment} from '../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // tslint:disable-next-line: variable-name

  // tslint:disable-next-line: variable-name
  constructor(private _http: HttpClient,  private router: Router, 
              public _helper: HelperService, protected _notificationSvc: NotificationService) {
   }

   // tslint:disable-next-line: variable-name
   _userLoginUrl = environment.baseUrl+ 'user/signin'; 

   // tslint:disable-next-line: variable-name
   _getCheckPairUrl = environment.baseUrl+'sherlock/getImageCount'; 
  // tslint:disable-next-line: typedef
  
  checkCreds(createBody: any){
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('content-type', 'application/json');
   
    // tslint:disable-next-line: max-line-length
    return this._http.post(this._userLoginUrl,  createBody, { headers: httpHeaders}).pipe(catchError( (err: any, caught: Observable<any>) => throwError(this.handleLoginError(err)) )  );
  }



  // tslint:disable-next-line: typedef
  checkPairingStatus(redirectRoute: string ){

    const getBearerToken = localStorage.getItem('PlayerToken');
    if (getBearerToken) {
    const httpHeaders = {
      'Content-Type': 'application/json',  authorization: getBearerToken
    };
    // tslint:disable-next-line: max-line-length
    return this._http.get(this._getCheckPairUrl, {headers:  httpHeaders}).pipe(catchError( (err: any, caught: Observable<any>) =>

      { 
        return throwError(this.pairUpError(err, redirectRoute)); } )  );

  }
  else {
    const httpHeaders = {
      'Content-Type': 'application/json',  authorization:  ' '
    };
    // tslint:disable-next-line: max-line-length
    return this._http.get(this._getCheckPairUrl, {headers:  httpHeaders})
     .pipe(catchError( (err: any, caught: Observable<any>) =>
    // tslint:disable-next-line: arrow-return-shorthand
  { return throwError(this.pairUpError(err, redirectRoute)); } )  );
  }

  }

// tslint:disable-next-line: typedef

private pairUpError(errorResponse: HttpErrorResponse, redirectRoute: string){
  let errorMessage = 'Unknown error';
  if (errorResponse.error instanceof ErrorEvent){
    errorMessage = `Error:  ${errorResponse.error.message}`;
  }
  else{

    errorMessage = `Error Code: ${errorResponse.status }\nMessage: ${errorResponse.message}`;
    const tracker  =  JSON.parse(JSON.stringify(errorResponse.error));
    if ( tracker.message === 'Bad Request! Requires a partner to play') 
    {   
      this._notificationSvc.warning('WARNING: ','Pairup with Watson to play' );
      setTimeout(() => {
        this.router.navigate([redirectRoute]); 
    }, 2000);  
    }
    else{

    this._notificationSvc.error('ERROR:' , errorResponse.error.message );


    }

}
  return throwError(errorMessage);
}

  // tslint:disable-next-line: typedef
  private handleLoginError( errorResponse: HttpErrorResponse) {
    let errorMessage = 'Unknown error';
    if (errorResponse.error instanceof ErrorEvent) {
      errorMessage = `Error:  ${errorResponse.error.message}` ;
    }
    else {
      errorMessage = `Error Code: ${errorResponse.status }\nMessage: ${errorResponse.message}`;
      this._notificationSvc.error('ERROR:', errorResponse.error.message);
    }
    return throwError(errorMessage);


  }

  // tslint:disable-next-line: typedef
sendSuccess() {
    this._notificationSvc.success('SUCCESS:', 'Login Details Accepted');
  }

  // tslint:disable-next-line: typedef
sendWarning() {
    this._notificationSvc.warning('Hello World', 'This is a warning !');
  }

  // tslint:disable-next-line: typedef

  // tslint:disable-next-line: typedef
sendCredError() {
    this._notificationSvc.error('ERROR:', 'Incorrect Credentials');
  }

  // tslint:disable-next-line: typedef
sendNotFoundUser(){
    this._notificationSvc.error('ERROR:', 'User Not Found');
  }



}

