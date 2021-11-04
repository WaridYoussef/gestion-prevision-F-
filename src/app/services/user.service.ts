import { changepass } from './../models/changepass';
import { HttpBackend, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { TokenService } from './token.service';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  private httpC: HttpClient;
  userId = "";

  constructor(private http: HttpClient,private httpBackend: HttpBackend ,private tokenService: TokenService) {
    //bach yjib liya lmanagers fach nbghi ncreer compte w ana deconnecté 
    this.httpC = new HttpClient(httpBackend);
  }

  getAllusers(): Observable<any>{
    this.userId= this.tokenService.getId()!;
   return this.http.get(`${environment.apiUrl}/user/collabs/`+this.userId)
  }

  //httpC = httpBackend
  getManagers(): Observable<any>{
    return this.httpC.get(`${environment.apiUrl}/user/managers`);
   }

  saveUser(data: User): Observable<any>{
    return this.http.post(`${environment.apiUrl}/user`, data);
  }

  updateUser(data: User): Observable<any>{
    return  this.http.put(`${environment.apiUrl}/user`+'/'+data.userId, data);
  }

//pour changer password
  updateUserPass(data: changepass): Observable<any>{
    this.userId= this.tokenService.getId()!;
    return  this.http.put(`${environment.apiUrl}/user/changePassWord`+'/'+this.userId, data);
  }

  getUser(): Observable<any>{
    this.userId= this.tokenService.getId()!;
    return  this.http.get(`${environment.apiUrl}/user`+'/'+this.userId);
  }

  deleteUser(data: User): Observable<any>{
    return  this.http.delete(`${environment.apiUrl}/user`+'/'+data.userId);
  }

  

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    }
     else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

}


