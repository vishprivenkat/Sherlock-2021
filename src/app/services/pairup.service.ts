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
export class PairupService {




  // tslint:disable-next-line: variable-name
  constructor(private _http: HttpClient, protected _notificationSvc: NotificationService, private router: Router, 
              // tslint:disable-next-line: variable-name
              public _helper: HelperService) {
}

  // tslint:disable-next-line: variable-name
  _pairupUrl =   environment.baseUrl+'sherlock/generateLink';
  _getCheckPairUrl = environment.baseUrl+'sherlock/getImageCount'; 

// tslint:disable-next-line: typedef
initConnect(createBody: any){
   var httpHeaders: any;
   const getBearerToken = localStorage.getItem('PlayerToken');
   if (getBearerToken) {
     httpHeaders = {  'Content-Type': 'application/json',  authorization: getBearerToken };
  }
    else{
       httpHeaders = {  'Content-Type': 'application/json',  authorization: '' };
    }
   return this._http
    .post(this._pairupUrl,  createBody, { headers: httpHeaders}) .pipe(catchError(
             (err: any, caught: Observable<any>) => throwError(this.handlePairupError(err)) )  );

}


// tslint:disable-next-line: typedef
private handlePairupError(errorResponse: HttpErrorResponse)
  {  let errorMessage = 'Unknown error';
     if (errorResponse.error instanceof ErrorEvent){
    errorMessage = `Error:  ${errorResponse.error.message}`;
  }
  else{

    errorMessage = `Error Code: ${errorResponse.status }\nMessage: ${errorResponse.message}`;
    this._notificationSvc.error('ERROR: ' , errorResponse.error.message );


  }

}

checkPairStatus(){
  const getBearerToken = localStorage.getItem('PlayerToken');
  if (getBearerToken) {
  const httpHeaders = {
    'Content-Type': 'application/json',  authorization: getBearerToken
  };
  // tslint:disable-next-line: max-line-length
  return this._http.get(this._getCheckPairUrl, {headers:  httpHeaders}).pipe(catchError( (err: any, caught: Observable<any>) =>

    { 
      return throwError(this.pairupError(err)); } )  );

}
else {
  const httpHeaders = {
    'Content-Type': 'application/json',  authorization:  ' '
  };
  // tslint:disable-next-line: max-line-length
  return this._http.get(this._getCheckPairUrl, {headers:  httpHeaders})
   .pipe(catchError( (err: any, caught: Observable<any>) =>
  // tslint:disable-next-line: arrow-return-shorthand
{ return throwError(this.pairupError(err)); } )  );
}

}



pairupError(errorResponse: HttpErrorResponse){
  let errorMessage = 'Unknown error';
  if (errorResponse.error instanceof ErrorEvent){
    errorMessage = `Error:  ${errorResponse.error.message}`;
  }
  else{

    errorMessage = `Error Code: ${errorResponse.status }\nMessage: ${errorResponse.message}`;
    const tracker  =  JSON.parse(JSON.stringify(errorResponse.error));
    if ( tracker.message === 'Bad Request! Requires a partner to play') 
    {   
      this._notificationSvc.error('ERROR:', 'Not Paired With Watson' );
    
    }
    else{

    this._notificationSvc.error('ERROR:' , errorResponse.error.message );

    }

}

  return throwError(errorMessage);
}


}
