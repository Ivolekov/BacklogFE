import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private documentPath = environment.apiUrl + "Documents";
  constructor(private http: HttpClient) {}

  getServiceProtocolDocument(id:number): Observable<ArrayBuffer>{
    return this.http.get(this.documentPath + '/CreateServiceProtocolDocument/' + id,
    { headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      reportProgress: true, 
      responseType: 'arraybuffer' 
    });
  }

  createServiceProtocolWarrantyCardFileDocument(serviceProtocolId: number, period: string){
    return this.http.get(this.documentPath + '/CreateServiceProtocolWarrantyCardDocument/' + serviceProtocolId + "/" + period,
    { headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      reportProgress: true, 
      responseType: 'arraybuffer' 
    });
  }
}
