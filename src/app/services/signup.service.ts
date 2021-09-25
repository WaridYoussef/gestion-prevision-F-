import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';



@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private http: HttpClient;

  //khdemt bl HttpBackend bach maychdnich l interceptor ygoliya 3tini token...
  constructor(private httpBackend: HttpBackend) { 
    this.http = new HttpClient(httpBackend);
  }

  

  newAccount(data: User): Observable<any>{
    return this.http.post(`${environment.apiUrl}/user`, data);
  }

 

}
