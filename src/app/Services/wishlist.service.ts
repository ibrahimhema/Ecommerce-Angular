import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../Shared/Product';
import { WishList } from '../Shared/wishList';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();


  constructor(private _htttpClint:HttpClient) { }
  GetWishListForThisUser(userid:string):Observable<WishList[]>{
  return  this._htttpClint.get<WishList[]>("http://localhost:9602/api/WishList/GetWishList?userid="+userid);

  }
  CheckIfWishListExistForThisUserAndProduct(userid:string,productid:number):Observable<boolean>{
    return  this._htttpClint.get<boolean>("http://localhost:9602/api/WishList/CheckIfExist?userid="+userid+"&productid="+productid);
  
    }
    AddToWishList(userid:string,productid:number):Observable<any>{
      
   return   this._htttpClint.post<any>('http://localhost:9602/api/WishList',{User_Id:userid,Product_Id:productid})
    
   
    }
    DeleteWishList(userid:string,productid:number):Observable<any>{
      var x={User_Id:userid,Product_Id:productid}
      return this._htttpClint.request('DELETE',"http://localhost:9602/api/WishList",{body:x});
    }
    changeMessage(message: string) {
      this.messageSource.next(message)
    }
    GetWishListProductForThisUser(userid:string):Observable<Product[]>{
      return  this._htttpClint.get<Product[]>("http://localhost:9602/api/WishList/GetWishList?userid="+userid);
    
      }
}
