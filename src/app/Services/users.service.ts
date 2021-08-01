import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../Shared/User';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  BaseUrl: string = "http://localhost:9602/api/users";

  public DeleteAdminUpdate = new Subject<string>();

  constructor(
    private _http: HttpClient
  ) {}

  GetUsers(): Observable<User[]> {
    return this._http.get<User[]>(this.BaseUrl);
  }

  GetVendors(): Observable<User[]> {
    return this._http.get<User[]>(`${this.BaseUrl}/vendors`);
  }

  GetAdmins(): Observable<User[]> {
    let headers = {"Auth": true}
    return this._http.get<User[]>(`${this.BaseUrl}/admins`);
  }


  DeleteAdmin(id: string): Observable<any>{
    return this._http.delete(`${this.BaseUrl}/${id}`)
  }

  MakeAdmin(id: string): Observable<any>{
    return this._http.post(`${this.BaseUrl}/${id}`,null);
  }

  GetById(userId: string): Observable<User>{
    return this._http.get<User>(`${this.BaseUrl}/${userId}`);
  }



}
