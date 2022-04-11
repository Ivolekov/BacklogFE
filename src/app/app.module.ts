import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './services/auth.service';
import { ServiceprotocolService } from './services/serviceprotocol.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuardService } from './services/auth-guard.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { CreateServiceProtocolComponent } from './create-service-protocol/create-service-protocol.component';
import { ListServiceProtocolsComponent } from './list-service-protocols/list-service-protocols.component';
import { DetailsServiceProtocolComponent } from './details-service-protocol/details-service-protocol.component';
import { ErrorInterceptorService } from './services/error-interceptor.service';
import { NotificationService } from './services/notification.service';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoaderService } from './services/loader.service';
import { DocumentService } from './services/document.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CreateServiceProtocolComponent,
    ListServiceProtocolsComponent,
    DetailsServiceProtocolComponent,
    NavMenuComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    ToastrModule.forRoot(),
    FontAwesomeModule
  ],
  providers: [
    AuthService,
    ServiceprotocolService,
    NotificationService,
    DocumentService,
    LoaderService,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
