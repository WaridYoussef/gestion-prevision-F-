import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Activity } from '../models/activity';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  userId = "";

  getAllactivities(): Observable<any>{
    this.userId= this.tokenService.getId()!;
    return this.http.get(`${environment.apiUrl}/activity/activs/`+this.userId);
   }
 
   saveActivity(data: Activity): Observable<any>{
     return this.http.post(`${environment.apiUrl}/activity`, data);
   }
 
   updateActivity(data: Activity): Observable<any>{
     return  this.http.put(`${environment.apiUrl}/activity`+'/'+data.id, data);
   }
 
   deleteActivity(data: Activity): Observable<any>{
     return  this.http.delete(`${environment.apiUrl}/activity`+'/'+data.id);
   }
}
