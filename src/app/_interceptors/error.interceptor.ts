import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> 
  {
    return next.handle(request).pipe(catchError(error => {

      if(error)
      {
        switch (error.status)
        {
          case 400:
            this.toastr.error(error.error);  
            break;
            
          case 401:
            this.toastr.error(error.error);
            break;
          
          case 404:
            this.toastr.error('Page Not Found');
            this.router.navigateByUrl('/');
            break;
          
          case 500:
            this.toastr.error('Internal Server Error, Please try after sometimes'); 
            this.router.navigateByUrl('/');
            break;

          default:
            this.toastr.error('Something went wrong! Please relaunch the application!!!');
            this.router.navigateByUrl('/');
            break;
        }
      }
      return throwError(error);
    }));
  }
}

