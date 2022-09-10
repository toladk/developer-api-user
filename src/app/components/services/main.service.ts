import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(
    private http: HttpClient
  ) { }

  requestApplicationAccess(payload: any){
    return this.http.post<any>(`${environment.baseUrl}/credentials/make-a-request`, payload, { headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    }});
  }

  getAllApplications(){
    return this.http.get(`${environment.baseUrl}/applications/scopes`, { headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    }});
  }

  getAssignedApplicationById(id: any){
    return this.http.get(`${environment.baseUrl}/credentials/retrieve-assigned/${id}`, { headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    }});
  }

}
