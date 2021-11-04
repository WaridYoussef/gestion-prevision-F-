import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AccountService } from 'src/app/services/account.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  admin = "";

  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.maxLength(30)])
  })
  
  constructor(private authService: AuthService,
              private tokenService: TokenService,
              private accountService: AccountService,
              private router: Router, private userService: UserService,
               private toastr: ToastrService, private spinner: NgxSpinnerService) { 

                this.spinner.show();

                setTimeout(() => {
                  /** spinner ends after 5 seconds */
                  this.spinner.hide();
                }, 500);
                
                }

  ngOnInit(): void {
  }

  login(){
    this.authService.login(this.loginForm.value).subscribe(res =>{
      this.handleResponse(res);
      this.toastr.success('opération réussie', 'Message', {
        timeOut: 3000, closeButton : true, positionClass: 'toast-top-right'
      })
    },(error) => {
      this.toastr.error("Nom d'utilisateur ou mot de passe incorrect", 'Message', {
       timeOut: 3000, closeButton : true, positionClass: 'toast-top-right'
     })
     console.log(error);
   }); 
  }
  
  handleResponse(res: Object){
    this.tokenService.hundle(res);
    this.accountService.changeStatus(true); 
    this.admin= this.tokenService.getAdmin()!;
  if(this.admin == "true"){
    this.router.navigateByUrl("/user")
  }else{
    this.router.navigateByUrl("/affectationUser");
  }
  }

  

}