import { Injectable } from '@angular/core';
import {NotificationService} from '../notification/notification.service'; 
import {environment} from '../../environments/environment'; 
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import {  throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Router} from '@angular/router'; 
import {HelperService} from './helper.service'; 


@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  _imageCountUrl = environment.baseUrl+'sherlock/getImageCount'; 
  _imageUrl = environment.baseUrl+'sherlock/getImage/'; 
  _cluesUrl = environment.baseUrl+'sherlock/getClues'; 
  _answerUrl = environment.baseUrl+'sherlock/postAnswer'; 

 // tslint:disable-next-line: variable-name
  response:any; 
  constructor( private _http:HttpClient, 
    // tslint:disable-next-line: align
    protected _notificationSvc: NotificationService, 
    // tslint:disable-next-line: align
    private router: Router) {

   }


   fetchQuestionRequest(){
     const getBearerToken = localStorage.getItem('PlayerToken'); 
     if(getBearerToken)
     {    const httpHeaders = { 
                'Content-Type': 'application/json', authorization: getBearerToken
              };
              // tslint:disable-next-line: align
              return this._http.get(this._imageCountUrl, {headers:  httpHeaders}).pipe(catchError( (err: any, caught: Observable<any>) =>   
              throwError(this.questionFetchError(err)))  );

     }
     else{
      const httpHeaders = {
        'Content-Type': 'application/json',  authorization:  ' '
      };
      // tslint:disable-next-line: max-line-length
      return this._http.get(this._imageCountUrl, {headers:  httpHeaders})
       .pipe(catchError( (err: any, caught: Observable<any>) =>
      // tslint:disable-next-line: arrow-return-shorthand
    { return throwError(this.questionFetchError(err)); } )  );
    }
  
     }


     questionFetchError(errorResponse: HttpErrorResponse){
      let errorMessage = '';
      if (errorResponse.error instanceof ErrorEvent) {
        errorMessage = `Error:  ${errorResponse.error.message}` ;
      }
      else {

        errorMessage = `Error Code: ${errorResponse.status }\nMessage: ${errorResponse.message}`;
      }
      return (errorResponse.error.message);
     }


     getClues(){
              const getBearerToken = localStorage.getItem('PlayerToken'); 
              if(getBearerToken)
              {    const httpHeaders = { 
                        'Content-Type': 'application/json', authorization: getBearerToken
                      };
                      // tslint:disable-next-line: align
                      return this._http.get(this._cluesUrl, {headers:  httpHeaders})
                            .pipe(catchError( (err: any, caught: Observable<any>) =>   
                      throwError(this.cluesFetchError(err)))  );
              }
              else{
              const httpHeaders = {
                'Content-Type': 'application/json',  authorization:  ' '
              };
              // tslint:disable-next-line: max-line-length
              return this._http.get(this._cluesUrl, {headers:  httpHeaders})
                .pipe(catchError( (err: any, caught: Observable<any>) =>
              // tslint:disable-next-line: arrow-return-shorthand
            { return throwError(this.cluesFetchError(err)); } )  );
            }

     }


     cluesFetchError(errorResponse: HttpErrorResponse){

              let errorMessage = 'Unknown error';
              if (errorResponse.error instanceof ErrorEvent) {
                errorMessage = `Error:  ${errorResponse.error.message}` ;
              }
              else {
                errorMessage = `Error Code: ${errorResponse.status }\nMessage: ${errorResponse.message}`;
                this._notificationSvc.error('ERROR:', errorResponse.error.message );
          

            }
              return throwError(errorMessage);

    } 


    checkAnswerGiven(createBody:any){
      var httpHeaders: any;
      const getBearerToken = localStorage.getItem('PlayerToken');
      if (getBearerToken) {
        httpHeaders = {  'Content-Type': 'application/json',  authorization: getBearerToken };
     }
       else{
          httpHeaders = {  'Content-Type': 'application/json',  authorization: '' };
       }
      return this._http
       .post(this._answerUrl,  createBody, { headers: httpHeaders}) .pipe(catchError(
                (err: any, caught: Observable<any>) => throwError(this.handleSubmitAnswerError(err)) )  );

    }

    handleSubmitAnswerError(errorResponse: HttpErrorResponse)
    {   let errorMessage = 'Unknown error';
        if (errorResponse.error instanceof ErrorEvent){
                  errorMessage = `Error:  ${errorResponse.error.message}`;
                }
      else{

        errorMessage = `Error Code: ${errorResponse.status }\nMessage: ${errorResponse.message}`;
        this._notificationSvc.error('ERROR: ' , errorResponse.error.message );


          }

  }


  async fetchImage(number:String)
  {  const getBearerToken = localStorage.getItem('PlayerToken'); 
      if(getBearerToken)
            {    const httpHeaders = { 
                      'Content-Type': 'application/json', authorization: getBearerToken
                    };
                    // tslint:disable-next-line: align
                    this.response =  await this._http.get(this._imageUrl+number, {headers:  httpHeaders,  responseType: 'blob' })
                    .pipe(catchError( (err: any, caught: Observable<any>) =>
                    throwError(this.imagesFetchError(err)))  ).toPromise();

                 return this.response; 

            }
            else{
            const httpHeaders = {
              'Content-Type': 'application/json',  authorization:  ' '
            };
            // tslint:disable-next-line: max-line-length
            this.response =  await this._http.get(this._imageUrl+number, {headers:  httpHeaders,  responseType: 'blob' })
            .pipe(catchError( (err: any, caught: Observable<any>) =>
            throwError(this.imagesFetchError(err)))  ).toPromise();

            return this.response; 
          }
  }

  imagesFetchError(errorResponse: HttpErrorResponse)
  {
                let errorMessage = 'Unknown error';
                if (errorResponse.error instanceof ErrorEvent) {
                  errorMessage = `Error:  ${errorResponse.error.message}` ;
                }
                else {
                  errorMessage = `Error Code: ${errorResponse.status }\nMessage: ${errorResponse.message}`;
                  this._notificationSvc.error('ERROR:', errorResponse.error.message );
                  setTimeout(() =>{
                    this.router.navigate(['home']); 
                  },2000 ); 
              }
                return throwError(errorMessage);


  }




} 


