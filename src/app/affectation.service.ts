import { Affectation } from './models/affectation';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AffectationService {

  constructor(private http: HttpClient) { }
 
  getAffectations(id: any): Observable<any>{
    return this.http.get(`${environment.apiUrl}/affectation/`+id)
   }

   saveAffectation(data: Affectation): Observable<any>{
    return this.http.post(`${environment.apiUrl}/affectation`, data);
  }

  updateAffectation(data: Affectation): Observable<any>{
    return  this.http.put(`${environment.apiUrl}/affectation`+'/'+data.id, data);
  }

  deleteAffectation(data: Affectation): Observable<any>{
    return  this.http.delete(`${environment.apiUrl}/affectation`+'/'+data.id);
  }
 
}
