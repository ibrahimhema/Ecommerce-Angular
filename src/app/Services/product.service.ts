import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../Shared/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  BaseURL: string = 'http://localhost:9602/api/product';

  constructor(private _http: HttpClient) {}

  GetProducts(): Observable<Product[]> {
    return this._http.get<Product[]>(this.BaseURL);
  }
  GetProductsBySubCategory(Subid: number): Observable<Product[]> {
    return this._http.get<Product[]>(
      'http://localhost:9602/api/product?Subid=' + Subid
    );
  }
  GetProductsByStore(id: string): Observable<Product[]> {
    return this._http.get<Product[]>(
      'http://localhost:9602/api/product/store?id=' + id
    );
  }

  SearchProducts(term: string, subid: number): Observable<Product[]> {
    return this._http.get<Product[]>(
      'http://localhost:9602/api/product/search?SubCatId=' +
        subid +
        '&SearchText=' +
        term
    );
  }

  GetProductById(prodId: number): Observable<Product>{
    return this._http.get<Product>('http://localhost:9602/api/product/'+prodId);
  }
  deleteProduct(id: any):Observable<any>
{
  return this._http.delete<any>(`http://localhost:9602/api/product/${id}`);
}
addProduct(_Product: Product):Observable<Product>
{
  const headerss = {
    'Authorization': "Bearer "+localStorage.getItem('access_token'),
  }


 
  let frmData=new FormData();
frmData.append("Name",_Product.Name)
frmData.append("Photo",_Product.Photo)
frmData.append("Offer_Price",_Product.Offer_Price+"")
frmData.append("Price",_Product.Price+"")
frmData.append("Quantity",_Product.Quantity+"")
frmData.append("Sub_Cat_Id",_Product.Sub_Cat_Id+"")
frmData.append("Vendor_User_id",_Product.Vendor_User_id+"")
frmData.append("Brand_Id",_Product.Brand_Id+"")
frmData.append("Desc",_Product.Desc)
  return this._http.post<Product>("http://localhost:9602/api/product",frmData,{headers:headerss});
}
editProduct(id: any,_Product: Product):Observable<Product>
{
  let frmData=new FormData();
  frmData.append("Name",_Product.Name)
  frmData.append("Photo",_Product.Photo)
frmData.append("Offer_Price",_Product.Offer_Price+"")
frmData.append("Price",_Product.Price+"")
frmData.append("Quantity",_Product.Quantity+"")
frmData.append("Sub_Cat_Id",_Product.Sub_Cat_Id+"")
frmData.append("Vendor_User_id",_Product.Vendor_User_id+"")
frmData.append("Brand_Id",_Product.Brand_Id+"")
frmData.append("Desc",_Product.Desc)
  return this._http.put<Product>(`http://localhost:9602/api/product/${id}`,frmData);
}
}
