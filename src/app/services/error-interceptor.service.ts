import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { LoaderService } from './loader.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService {

  constructor(private notificationService: NotificationService, 
              private authService: AuthService, 
              private router: Router,
              private loaderService: LoaderService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((err)=>{
        this.loaderService.showLoader = false;
        if(err.status === 400){
          //refresh token or redirect to login
          this.notificationService.showError('400','Error');
          this.router.navigate([this.router.url])
          .then(() => {
            //window.location.reload()
          });

        }
        else if(err.status === 401){
          //some custom msg
          if(this.router.url != '/register'){
            if(!this.authService.isAuthenticated() && this.router.url != '/login')
            {
              this.router.navigate(["login"]);
            }else{
              this.notificationService.showError('Невалидно потребителско име или парола.','Неуспешен вход.');
            }
          }
          
        }
        else if(err.status === 404){
           //some custom msg
           this.notificationService.showError('404','Error');
        }
        else{
          this.notificationService.showError('Opps','Error');
        }
        return throwError(err);
      })
    )
  }
}
