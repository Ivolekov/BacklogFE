import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private loaderService: LoaderService,) {
    this.loginForm = this.fb.group({
      'username' : ['', Validators.required],
      'password' : ['', Validators.required]
    })
    
   }

  ngOnInit(): void {
  }

  login(){
    this.loaderService.showLoader = true;
    this.authService.login(this.loginForm.value).subscribe( data => {
      this.authService.saveToken(data['token']);
      this.router.navigate([""]);
    })
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
