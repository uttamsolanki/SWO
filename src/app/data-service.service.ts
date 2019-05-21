import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();
  newData;
  constructor() { }

  setData(data: string) {
   // this.messageSource.next(message);
    this.newData = data;
  }
  getDate() {
    return this.newData;
  }
}
