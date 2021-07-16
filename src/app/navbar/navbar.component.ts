
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnInit, OnDestroy} from '@angular/core';
import {HelperService} from '../services/helper.service' ;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  show:boolean = false; 
  sidenavWidth = 0;
  // tslint:disable-next-line: variable-name
  constructor(private _helper: HelperService) {

  }

  // tslint:disable-next-line: typedef
  ngOnInit() {

  }
  // tslint:disable-next-line: typedef
  increase() {
    this.sidenavWidth = 250;
   
    this.show = true; 

  }
  // tslint:disable-next-line: typedef
  decrease() {
    this.sidenavWidth = 0;
    this.show=false;
 
  }

  // tslint:disable-next-line: typedef
  loginCheck(){
    if(this._helper.checkLoggedIn())
      { return true; 

      }
    else
    { return false;

    }
  }

  pairUpCheck(){
    if(this._helper.checkPaired() && this._helper.checkLoggedIn()) 
    { return true; 

    }
    return false; 

  }

  pairupRouteCheck(){
    if(this._helper.checkLoggedIn() && !this._helper.checkPaired())
    {return true; 
    }
    return false;
  }


  performLogout()
  { this._helper.performLogout();

  }


}
