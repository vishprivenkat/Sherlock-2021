import { Component, OnInit } from '@angular/core';
import {FormGroup , FormControl, Validators, FormBuilder} from '@angular/forms' ;
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { PairupService} from '../services/pairup.service'; import { NotificationService } from '../notification/notification.service';
import {Router} from '@angular/router'; 
import {LoginService} from '../services/login.service';
@Component({
  selector: 'app-pairup',
  templateUrl: './pairup.component.html',
  styleUrls: ['./pairup.component.scss']
})
export class PairupComponent implements OnInit {


  // tslint:disable-next-line: variable-name
  constructor(private fb: FormBuilder, private _pairup: PairupService, 
              // tslint:disable-next-line: variable-name
              private _loginService: LoginService,
              // tslint:disable-next-line: variable-name
              protected _notificationSvc: NotificationService, private router: Router) { }

  watsonForm: FormGroup = this.fb.group({
    kid: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
  });
  ngOnInit(): void {
  }
  onSubmit() {
    if (!this.watsonForm.valid) {
      return;
    }
    const watsonData = { "watson_id":this.watsonForm.value.kid};
    const watsonKid = watsonData.watson_id.kid;
    this._pairup.initConnect(watsonData).subscribe( 
              data  => { 
                this._notificationSvc.success('SUCCESS', 'Mail Sent for Pairing Initiation. Ask Watson to click the link sent to their mail ID to initiate Pairup!'); 
               
              },
              (err) =>{
             
              }
              );
  }

checkToProceed(){
  this._pairup.checkPairStatus().subscribe(
    data => {
       
            localStorage.setItem('PairingStatus',  'true'); 
            this._notificationSvc.success('SUCCESS:','Players have been Paired Sucessfully. You will be taken to the game'); 
            setTimeout(() => {
              this.router.navigate(['/game']); 
          }, 1000);  
          }, 
      err =>{
               
              }
  );

}



}
