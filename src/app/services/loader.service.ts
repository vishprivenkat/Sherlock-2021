import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderState } from '../loader/loader.model';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
   private loaderSubject = new Subject<LoaderState>();
  loaderState = this.loaderSubject.asObservable();
  constructor() { }
  // tslint:disable-next-line: typedef
  show() {
    this.loaderSubject.next({ show: true } as LoaderState);
  }
  // tslint:disable-next-line: typedef
  hide() {
    this.loaderSubject.next({ show: false } as LoaderState);
  }
}
