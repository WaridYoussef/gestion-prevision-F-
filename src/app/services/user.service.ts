import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllusers(): Observable<any>{
   return this.http.get(`${environment.apiUrl}/user`)
  }

  saveUser(data: User): Observable<any>{
    return this.http.post(`${environment.apiUrl}/user`, data);
  }

  updateUser(data: User): Observable<any>{
    return  this.http.put(`${environment.apiUrl}/user`+'/'+data.userId, data);
  }

  deleteUser(data: User): Observable<any>{
    return  this.http.delete(`${environment.apiUrl}/user`+'/'+data.userId);
  }

  

}
