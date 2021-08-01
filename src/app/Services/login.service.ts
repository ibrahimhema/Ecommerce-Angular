import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Login } from '../Shared/login';
import { Register } from '../Shared/register';
import { User } from '../Shared/User';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private messageSource2 = new BehaviorSubject("")
  currentMessage2 = this.messageSource2.asObservable();
  constructor(private _httpClint:HttpClient) { }

  Login(user:Login):Observable<any>{
    const headerss = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    
    }

 var body = "grant_type=password&username="+ user.username + 
 "&password=" + user.password; 
   return this._httpClint.post<any>("http://localhost:9602/login",body,{headers:headerss})
  
       
  }
  Register(user:Register):Observable<any>{
    const headerss = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
   
    }
  let frmData=new FormData();
  if (user.Photo != null)
    frmData.append("avatar",user.Photo)
  frmData.append("First",user.FirstName)
  frmData.append("LastName",user.LastName)
  frmData.append("USername",user.Username)
  frmData.append("email",user.Email)
  frmData.append("PasswordHash",user.PasswordHash)
  frmData.append("ConfirmPassword",user.ConfirmPassword)
  frmData.append("role",user.Role)
    return this._httpClint.post<any>("http://localhost:9602/api/account",frmData)
  }
  changeMessage(message: string) {
    this.messageSource2.next(message)
  }

  EditProfile(user: User, imageFile: File){
    let formData = new FormData();
    formData.append("Id",user.Id);
    formData.append("FirstName", user.FirstName);
    formData.append("Address", user.Address);
    formData.append("LastName", user.LastName);
    formData.append("Username", user.Username);
    formData.append("imageFile", imageFile);
    console.log(user)
    return this._httpClint.put<any>(`http://localhost:9602/api/account/edit`,formData)
  }

}
