import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateServiceProtocolComponent } from './create-service-protocol/create-service-protocol.component';
import { DetailsServiceProtocolComponent } from './details-service-protocol/details-service-protocol.component';
import { ListServiceProtocolsComponent } from './list-service-protocols/list-service-protocols.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'createServiceProtocol', component : CreateServiceProtocolComponent, canActivate: [AuthGuardService]},
  {path: 'serviceProtocols', component : ListServiceProtocolsComponent, canActivate: [AuthGuardService]},
  {path: '', component : ListServiceProtocolsComponent, canActivate: [AuthGuardService]},
  {path: 'serviceProtocol/:id', component : DetailsServiceProtocolComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
