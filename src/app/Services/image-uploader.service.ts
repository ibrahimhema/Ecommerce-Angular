import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageUploaderService {

  urlString: string = "http://localhost:9602/api/Uploader"

  constructor(
    private _http: HttpClient
  ) { }

  Upload(image: File): Observable<string>{
    let formData = new FormData();
    formData.append('imageFile', image);
    
    return this._http.post<string>(this.urlString,formData);
  }

  
}
