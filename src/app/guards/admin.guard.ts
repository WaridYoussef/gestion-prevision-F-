import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { TokenService } from '../services/token.service';



@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

    admin = "";

  constructor(private tokenService: TokenService, private accountService: AccountService, private router: Router){}

  canActivate(): boolean {
    this.admin= this.tokenService.getAdmin()!;
        if(this.admin == "false"){
        
          this.router.navigate(["/affectationUser"]);
          return false;
        }

        return true;

  }
  
}