import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CompanyProfile } from '../models/CompanyProfile';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private companyProfilePath = environment.apiUrl + "Company";
  constructor(private http: HttpClient) {}
  
  getCompanyProfile(){
    return this.http.get<CompanyProfile>(this.companyProfilePath);
  }

  updateCompanyProfile(id:number, profile: CompanyProfile){
    console.log(profile);
    return this.http.put(this.companyProfilePath + "/" + id, profile);
  }
}
