import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductDetails } from '../Shared/ProductDetails';
import { Rating } from '../Shared/Rating';
import { Rating2 } from '../Shared/Rating2';

@Injectable({
  providedIn: 'root'
})
export class ProductdetailsService {
  BaseURL: string = "http://localhost:9602/api/DetailsPage";
  constructor(  private _http: HttpClient) { }
  GetProductDetails(id:number): Observable<ProductDetails>{
    return this._http.get<ProductDetails>(this.BaseURL+"/"+id);
  }
  _url:string="http://localhost:9602/api/DetailsPage";
  enroll(rating:Rating)
  {
   return this._http.post<any>(this._url,rating);
  }
}
