import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '../Shared/Store';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  BaseURL: string = "http://localhost:9602/api/Store";
  constructor(
    private _http: HttpClient
  ) { }

  GetStores(): Observable<Store[]>{
    return this._http.get<Store[]>(this.BaseURL);
  }
}
