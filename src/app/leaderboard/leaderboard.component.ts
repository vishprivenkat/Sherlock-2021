import { Component, OnInit } from '@angular/core';
import {LeaderboardService} from '../services/leaderboard.service'; 
import {HelperService} from '../services/helper.service'; 
import {Router} from '@angular/router';  
import {  throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Observable} from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
      visibility:boolean = false; 
      errorMessage:String=''; 
      dataFetched:any; 
       tableDisplay:any;  
       dataSource:any;
       displayedColumns = ['Player 1 K!ID', 'Player 2 K!ID', 'Player 1', 'Player 2', 'Points']; 

  constructor(private _leaderboard:LeaderboardService,
    private _helper:HelperService, 
    ) { }


  ngOnInit(): void {
    this._leaderboard.getLeaderboard().subscribe(
        (data) => {
       
          this.dataSource= data.pairs;  

        }, 
        (err) =>{
        
       
          this.visibility=true; 
          this.errorMessage=err.toString();
          

        }

    ); 
    


  }

  reload(){
    window.location.reload();
  }

  }



