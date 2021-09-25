import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Activity } from '../models/activity';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private http: HttpClient) { }

  getAllactivities(): Observable<any>{
    return this.http.get(`${environment.apiUrl}/activity`)
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
