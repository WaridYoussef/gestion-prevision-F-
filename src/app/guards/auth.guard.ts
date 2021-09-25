import { AccountService } from 'src/app/services/account.service';
import { TokenService } from 'src/app/services/token.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private tokenService: TokenService, private accountService: AccountService, private router: Router){}
  canActivate(): boolean {
    if(!this.tokenService.loggedIn()){
      this.tokenService.remove();
      this.accountService.changeStatus(false);
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
  
}
