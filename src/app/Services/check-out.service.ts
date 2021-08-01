import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CheckOutForm } from '../Shared/CheckOutForm';
import { Order } from '../Shared/Order';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class CheckOutService {

  url:string='http://localhost:9602/api/CheckOut'
  constructor(
    private _http:HttpClient,
    private _cartService:CartService,
    
    ) { }

  PostOrder(data: CheckOutForm): Observable<any>{
    this._cartService.EmptyCart();
    return this._http.post<any>(this.url, data);
    

  }
  


  GetUserOrders(userId: string): Observable<Order[]>{
    return this._http.get<Order[]>(`${this.url}/userOrders?id=${userId}`);
  }

  GetAllOrders(): Observable<Order[]> {
    return this._http.get<Order[]>(this.url);
  }

  PutOrder(data: CheckOutForm): Observable<any>{
  
    return this._http.put(`${this.url}/${data.Id}`,data);
  }
  getById(id: any): Observable<CheckOutForm> {
    return this._http.get<CheckOutForm>(`${this.url}/${id}`);
  }

}
