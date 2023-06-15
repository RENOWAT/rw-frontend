import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { SessionService } from '@services/core/session.service';
import {environment} from "@env";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private router;
  injector: Injector;

  constructor(private sessionService:SessionService, _injector: Injector) {
    this.injector =_injector;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.url === environment.REST_BACKEND + '/users/token' ||
      request.url === environment.REST_BACKEND + '/customers/create' ) {
      return next.handle(request);
    }
    else {
      const token = this.sessionService.getToken();
      //Add token to header
      if(token){
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      }

      return next.handle(request).pipe(tap(event => { }, err => {
        if (err instanceof HttpErrorResponse && err.status == 401) {
          // handle 401 errors
          console.warn("Not authorized");
          if (this.router == null) {
            this.router = this.injector.get(Router);
          }
          this.router.navigate(['/']);
        }
      }));
    }
  }

}
