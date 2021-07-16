import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment'; 
import {NotificationService} from '../notification/notification.service'; 

import {HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import {Router} from '@angular/router'; 
import {  throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Observable} from 'rxjs';
import {HelperService} from './helper.service'; 


@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {

  _leaderboardUrl = environment.baseUrl+'sherlock/leaderboard'; 
  constructor( private _http:HttpClient, 
     // tslint:disable-next-line: align
    protected _notificationSvc: NotificationService, 

    // tslint:disable-next-line: align
    private router: Router) { }

  // tslint:disable-next-line: typedef
  getLeaderboard(){
    const getBearerToken = localStorage.getItem('PlayerToken'); 
    if(getBearerToken)
    {    const httpHeaders = { 
               'Content-Type': 'application/json', authorization: getBearerToken
             };
             // tslint:disable-next-line: align
             return this._http.get(this._leaderboardUrl, {headers:  httpHeaders}).pipe(catchError( (err: any, caught: Observable<any>) =>   
             throwError(this.leaderboardFetchError(err)))  );

    }
    else{
     const httpHeaders = {
       'Content-Type': 'application/json',  authorization:  ' '
     };
     // tslint:disable-next-line: max-line-length
     return this._http.get(this._leaderboardUrl, {headers:  httpHeaders})
      .pipe(catchError( (err: any, caught: Observable<any>) =>
     // tslint:disable-next-line: arrow-return-shorthand
   { return throwError(this.leaderboardFetchError(err)); } )  );
   }

}

  leaderboardFetchError(errorResponse: HttpErrorResponse)
  {       let errorMessage = 'Unknown error';
            // tslint:disable-next-line: align
            if (errorResponse.error instanceof ErrorEvent) {
              errorMessage = `Error:  ${errorResponse.error.message}` ;
            }
            else {
              errorMessage = `Error Code: ${errorResponse.status }\nMessage: ${errorResponse.statusText}`;
          
            }
            // tslint:disable-next-line: align
            return (errorResponse.error.message);

  }

}