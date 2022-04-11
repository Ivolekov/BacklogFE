import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceProtocol } from '../models/ServiceProtocol';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceprotocolService {
  private serviceProtocolPath = environment.apiUrl + "ServiceProtocols";
  constructor(private http: HttpClient) { }

  create(data: any): Observable<ServiceProtocol> {
    return this.http.post<ServiceProtocol>(this.serviceProtocolPath, data);
  }

  getServiceProtocols():Observable<Array<ServiceProtocol>>{
    return this.http.get<Array<ServiceProtocol>>(this.serviceProtocolPath);
  }

  getServiceProtocol(id: string): Observable<ServiceProtocol>{
    return this.http.get<ServiceProtocol>(this.serviceProtocolPath + "/" + id);
  }

  edit(data: any, id:number){
    return this.http.put(this.serviceProtocolPath + "/" + id, data)
  }

  changeServiceProtocolStatus(id: number, statusId: number,){
    return this.http.put(this.serviceProtocolPath+"/" + id + "/" + statusId, null);
  }

  deleteServiceProtocol(protocolId: number){
    return this.http.delete(this.serviceProtocolPath + "/" + protocolId)
  }

  search(input: any):Observable<Array<ServiceProtocol>>{
    return this.http.get<Array<ServiceProtocol>>(this.serviceProtocolPath + "/Search/" + input)
  }
}
