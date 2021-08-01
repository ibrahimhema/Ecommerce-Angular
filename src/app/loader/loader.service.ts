import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }


  GetIsLodaing(): Observable<boolean> {
    return this.isLoading.asObservable();
  }

  StartLoading(){
    this.isLoading.next(true);
  }

  StopLoading(){
    this.isLoading.next(false);
  }

}
