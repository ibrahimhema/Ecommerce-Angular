import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormMain_Cat } from '../Shared/FormMain_Cat';
import { Main_Category } from '../Shared/Main_Category';

@Injectable({
  providedIn: 'root'
})
export class MainCategoryService {
  url: string = 'http://localhost:9602/api/Main_Category';
  constructor(private _http: HttpClient) {}

  GetAllMain_cat(): Observable<Main_Category[]> {
    return this._http.get<Main_Category[]>(this.url);
  }

  getById(id: any): Observable<Main_Category> {
    return this._http.get<Main_Category>(`${this.url}/${id}`);
  }

  PostMain_Cat(data: FormMain_Cat): Observable<any>{
    let formData = new FormData();
    formData.append('Name', data.Name);
    formData.append('imageFile', data.imageFile);
    return this._http.post<any>(this.url, formData);
  }

  PutMain_Cat(data: Main_Category): Observable<any>{
    let formData = new FormData();
    formData.append('Name', data.Name);
    formData.append('imageFile', data.imageFile);
    return this._http.put(`${this.url}/${data.Id}`,formData);
  }

  DeleteMain_cat(id: any): Observable<Main_Category[]> {
    return this._http.delete<Main_Category[]>(`${this.url}/${id}`);
  }


 
}
