import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubCategoryForVanBar } from '../Shared/SubCategoryForNavBar';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryNavBarService {
  BaseURL: string = "http://localhost:9602/api/ForShowTree";
  constructor(private httpclint:HttpClient) {

   }
   GetSubWithChild():Observable<SubCategoryForVanBar[]>{
    return this.httpclint.get<SubCategoryForVanBar[]>(this.BaseURL);
   }
}
