import { Component, OnInit, OnDestroy} from '@angular/core';
import {MatProgressBarModule} from  '@angular/material/progress-bar'; 
import { Subscription } from 'rxjs';
import { LoaderService } from '../services/loader.service';
import { LoaderState } from './loader.model';
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  show = false;
  private subscription!: Subscription;

  // tslint:disable-next-line: variable-name
  constructor(private loaderService: LoaderService) { }


  ngOnInit(): void {
    this.subscription = this.loaderService.loaderState
    .subscribe((state: LoaderState) => {
      this.show = state.show;
    });
  }

 
}
