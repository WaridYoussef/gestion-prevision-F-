import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }


  set(data : any){
    localStorage.setItem('token', data.token);
    localStorage.setItem('id', data.id);
    localStorage.setItem('name', data.name);
    localStorage.setItem('admin', data.admin)
  }

  hundle(data: any){
    this.set(data);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  getId(){
    return localStorage.getItem('id');
  }

  getName(){
    return localStorage.getItem('name');
  }

  getAdmin(){
    return localStorage.getItem('admin');
  }

  

  remove(){
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('name');
    localStorage.removeItem('admin');
  }

  decode(payload: string){
    return JSON.parse(atob(payload));
  }

  payload(token : any){
    const payload = token.split('.')[1];
    console.log('payload : ', payload)
    return this.decode(payload);
  }

  isValid(){
    const token = this.getToken();
    const id = this.getId();

    if(token){
      const payload = this.payload(token);
      if(payload){
        return id == payload.id;
      }
    }
    return false;
  }

  getInfos(){
    const token = this.getToken();

    if(token) {
      const payload = this.payload(token)
      return payload ? payload : null;
    }
    return null;
  }

  loggedIn(){
    return this.isValid();
  }

}
