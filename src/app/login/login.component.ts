import { Component, OnInit } from '@angular/core';
import {FormGroup , FormControl, Validators, FormBuilder} from '@angular/forms' ;
import { Router} from '@angular/router';
import { NotificationService } from '../notification/notification.service';
import {LoginService} from '../services/login.service'; 
import { environment } from '../../environments/environment';
import {HelperService} from '../services/helper.service'; 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private fb: FormBuilder,
              protected _notificationSvc: NotificationService, 
              private _loginService: LoginService, 
              private router: Router, 
              private _helper:HelperService) {
  }
  hide = true;
 user: any = ' ';  
 userDetails: any; 
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

    // tslint:disable-next-line: typedef
  ngOnInit() {
  }


  // tslint:disable-next-line: typedef
  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }
  
    const userData = { email: this.loginForm.value.email, password: this.loginForm.value.password};
    if (!this._helper.checkLoggedIn())
    {
    // tslint:disable-next-line: deprecation
    
    this._loginService.checkCreds(userData).subscribe((data: any) => {
      localStorage.setItem('PlayerToken', data.token);

      this.success('Credentials Verified! Hit Login to Play to Proceed!');
      });

  }

    // tslint:disable-next-line: deprecation
    if (this._helper.checkLoggedIn()) 

    {   if(this._helper.checkPaired()) 
        {   this.router.navigate(['/game']); 

        } 
        else{ 

        
            // tslint:disable-next-line: align
            this._loginService.checkPairingStatus('/pairup').subscribe(
                                data => {
                           
                                        localStorage.setItem('PairingStatus',  'true'); 
                                        this.router.navigate(['/game']);
                                      }, 
                                  err =>{
                                              
                                          }
                              );
    }
  }


}


  // tslint:disable-next-line: typedef
  redirectTo(){
    window.open( 'https://kurukshetraceg.org.in/login',  '_blank'); 
  
  }

  // tslint:disable-next-line: typedef
  callGoogleSignin(){
    location.href = environment.baseUrl+'user/googlesignin';
  }

  sendServerError(message: any) {
    this._notificationSvc.error('Status: Operation Failure', message);
  }

  success(message: any){
    this._notificationSvc.success('Status: Success', message); 
  } 




}

