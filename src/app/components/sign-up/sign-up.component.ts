import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { SignupService } from 'src/app/services/signup.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  confirmPass="";

  users: User[] = [];
  managers: User[] = [];
  
  user = {
    id: 0,
    userId : "",
    firstName: "",
    lastName: "",
    admin: false,
    email: "",
    managerId: "",
    password:"",
  };

  clearInputs(){
    this.confirmPass="",
    this.user = {
      id: 0,
      userId : "",
      firstName: "",
      lastName: "",
      admin: false,
      managerId: "",
      email: "",
      password:"",
    }
    };

  constructor(private signupService: SignupService, private toastr: ToastrService,
     private router: Router, private userService: UserService, private spinner: NgxSpinnerService) { 
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 500);
   }

  ngOnInit(): void {
    this.getAllManagers();
  }

  getAllManagers(){
    this.userService.getManagers().subscribe((res : User[]) =>{
      console.log(res);
      this.managers = res;
    })
  }

  createAccount(){
    this.signupService.newAccount(this.user).subscribe((res) => {
      this.toastr.success('opération réussie', 'Message', {
        timeOut: 3000, closeButton : true, positionClass: 'toast-top-right'
      })
      
  },(error) => {
    this.toastr.error('email existe déjà', 'Message', {
     timeOut: 3000, closeButton : true, positionClass: 'toast-top-right'
   })
   console.log(error);
 });
  }


}
