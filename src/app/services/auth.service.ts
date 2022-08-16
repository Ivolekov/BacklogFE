import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { FormGroup } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

private loginPath = environment.apiUrl + 'Identity/login';
private registerPath = environment.apiUrl + 'Identity/register';

  constructor(private http: HttpClient) { }

  login(data: FormGroup): Observable<any> {
    return this.http.post(this.loginPath, data);
  }

  register(data: FormGroup) :Observable<any>{
    return this.http.post(this.registerPath, data);
  }

  saveToken(token: any){
    localStorage.setItem('token', token);
  }

  getToken(): string{
    // let isAuthenticated = localStorage.getItem('token');
    // if (isAuthenticated == null) {
    //   return false;
    // } else {
    //   return true;
    // }
    return localStorage.getItem('token');
  }
  
  deleteToken(){
    localStorage.removeItem('token');
  }

  isAuthenticated() {
    if (this.getToken()) {
      return true;
    }
    return false;
  }
}
