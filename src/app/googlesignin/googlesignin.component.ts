import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {HelperService} from '../services/helper.service'; 
import {LoginService} from '../services/login.service'; 



@Component({
  selector: 'app-googlesignin',
  templateUrl: './googlesignin.component.html',
  styleUrls: ['./googlesignin.component.scss']
})
export class GooglesigninComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute, 
    private _helper:HelperService, 
    private router:Router, 
    private _loginService:LoginService
    ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      
      localStorage.setItem('PlayerToken',params.token);

    });

  }

  onSubmit(){
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



}
