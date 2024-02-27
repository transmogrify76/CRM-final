import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http:HttpClient) { }

  register(data:any):Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/register/' , data);
  }

  login(data:any):Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/login/' , data);
  }
  logout(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post('http://127.0.0.1:8000/api/logout/', {}, { headers });
  }
  allData(token:string):Observable<any> {
    const httpHeaders:HttpHeaders = new HttpHeaders({
      Authorization: `Token ${token}`
    });
    return this.http.get('http://127.0.0.1:8000/api/customers/', { headers : httpHeaders });
  }
  addCustomer(token:string , payload:any):Observable<any> {
    const httpHeaders:HttpHeaders = new HttpHeaders({
      Authorization: `Token ${token}`
    });
    return this.http.post('http://127.0.0.1:8000/api/customers/' , payload , { headers : httpHeaders } );
  }
  getCustomerById(customer_id: number, token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Token ${token}`);
    return this.http.get<any>(`http://127.0.0.1:8000/api/customers/${customer_id}/`, { headers });
  }
  updateCustomer(customer_id: number, token: string , data: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Token ${token}`);
    return this.http.put<any>(`http://127.0.0.1:8000/api/customers/${customer_id}/`, data, { headers });
  }
  

}
