import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentUser?: null;
  name = '';
  admin = "";
  isAdmin = false
  constructor(private accountService: AccountService, private tokenService: TokenService, private router: Router) { }

  ngOnInit(): void {
    this.accountService.authStatus.subscribe(res => {
      this.currentUser= this.tokenService.getInfos();
       //Name dyal CurrentUser
       this.name= this.tokenService.getName()!;
       this.admin= this.tokenService.getAdmin()!;
     if(this.admin == "true"){
       this.isAdmin = true
     }else{
       this.isAdmin = false
     }
    })
  }


  logout(){
    this.tokenService.remove();
    this.accountService.changeStatus(false);
    this.router.navigateByUrl("/login")
  }


}
