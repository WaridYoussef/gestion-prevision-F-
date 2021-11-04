import { Affectation } from './models/affectation';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenService } from './services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AffectationService {

  userId = "";

  constructor(private http: HttpClient, private tokenService: TokenService) { }
 
  getAffectations(id: any): Observable<any>{
    return this.http.get(`${environment.apiUrl}/affectation/`+id)
   }

   //pour DASHBOARD component
   getDashboardAffectations(): Observable<any>{
    this.userId= this.tokenService.getId()!;
    return this.http.get(`${environment.apiUrl}/affectation/dashboard/`+this.userId)
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
