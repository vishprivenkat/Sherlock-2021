import { Component, OnInit } from '@angular/core';
import {HelperService} from '../services/helper.service'; 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _helper:HelperService) { }

  ngOnInit(): void {
  }



  loginStatus(){
    if(this._helper.checkLoggedIn() && this._helper.checkPaired() )
      {return true; }
    else {
      return false; 
    }

  }

}
