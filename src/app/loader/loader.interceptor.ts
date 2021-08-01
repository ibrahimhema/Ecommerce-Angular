import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from './loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(
    private _loaderService: LoaderService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this._loaderService.StartLoading()
    let token = localStorage.getItem("access_token");
    if (token) {
      request = request.clone({
        setHeaders: {
          'Authorization': `bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      finalize(
        () => {
          this._loaderService.StopLoading();
        }
      )
    );
  }
}
