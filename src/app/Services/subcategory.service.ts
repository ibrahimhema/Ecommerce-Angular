import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { SubCategory } from '../Shared/SubCategory';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {
 
  constructor(private _http:HttpClient) { }
  url:string="http://localhost:9602/api/SubCategory";
  getAllSubcategories(): Observable<SubCategory[]>{
    return this._http.get<SubCategory[]>(this.url);
  }

  getSubcategoryById(id:any):Observable<SubCategory>
{
  return this._http.get<SubCategory>(`${this.url}/${id}`);
}
deleteSubcategory(id: any):Observable<any>
{
  return this._http.delete<any>(`${this.url}/${id}`);
}
addSubcategory(_SubCategory: SubCategory/*,file:any*/):Observable<any>
{
  /*const headerss = {
    'content-disposition': `form-data;name="Photo";filename=${file.filename}`,
    'content-type': 'application/octet-stream'
  }*/
  let formData = new FormData();
  formData.append('Id', `${_SubCategory.Id}`);
  formData.append('Name', _SubCategory.Name);
  formData.append("Parent_id",`${_SubCategory.Parent_Id}`);
  formData.append("Cat_Id",`${_SubCategory.Cat_Id}`);
  formData.append('imageFile', _SubCategory.imageFile!);
  return this._http.post<any>(`${this.url}`,
  formData/*,{headers:headerss}*/);
}
editSubcategory(id: any,_SubCategory: SubCategory):Observable<SubCategory>
{
  let formData = new FormData();
  formData.append('Id', `${_SubCategory.Id}`);
  formData.append('Name', _SubCategory.Name);
  formData.append("Parent_id",`${_SubCategory.Parent_Id}`);
  formData.append("Cat_Id",`${_SubCategory.Cat_Id}`);
  formData.append("Photo",_SubCategory.Photo);
  formData.append('imageFile', _SubCategory.imageFile!);
  return this._http.put<SubCategory>(`${this.url}/${id}`,formData);
}


}
