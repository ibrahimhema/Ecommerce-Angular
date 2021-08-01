import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brand } from '../Shared/Brand';
import { FormBrand } from '../Shared/FormBrand';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  url: string = 'http://localhost:9602/api/brand';
  constructor(private _http: HttpClient) {}

  GetAllBrand(): Observable<Brand[]> {
    return this._http.get<Brand[]>(this.url);
  }

  getById(id: any): Observable<Brand> {
    return this._http.get<Brand>(`${this.url}/${id}`);
  }

  PostBrand(data: FormBrand): Observable<any>{
    let formData = new FormData();
    formData.append('Name', data.Name);
    formData.append('imageFile', data.imageFile);
    return this._http.post<any>(this.url+"/create", formData);
  }

  DeleteBrand(id: any): Observable<Brand[]> {
    return this._http.delete<Brand[]>(`${this.url}/${id}`);
  }

  PutBrand(data: Brand): Observable<any>{
    let formData = new FormData();
    formData.append('Name', data.Name);
    formData.append('imageFile', data.imageFile);
    return this._http.put(`${this.url}/${data.Id}`,formData);
  }
}
