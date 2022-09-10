import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JarwisService {

  constructor(private http : HttpClient) { }

  signupUser(data: any) {
    return this.http.post(`${environment.baseUrl}/users/register` , data, {headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    }})
  }

  signupCompany(data: any) {
    return this.http.post(`${environment.baseUrl}/tenants/register` , data, {headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    }})
  }

  login(data: any) {
    return this.http.post(`${environment.baseUrl}/users/authenticate` , data, {headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    }})
  }

  validateAccountDetails(data: any) {
    return this.http.post(`${environment.baseUrl}/validate-account` , data, {headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    }})
  }

  getCompanies() {
    return this.http.get(`${environment.baseUrl}/tenants/list-approved-only`, {headers: {
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    }})
  }

}
