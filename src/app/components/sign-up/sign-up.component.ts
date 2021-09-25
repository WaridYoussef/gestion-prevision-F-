import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { SignupService } from 'src/app/services/signup.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  users: User[] = [];
  
  user = {
    id: 0,
    userId : "",
    firstName: "",
    lastName: "",
    admin: false,
    email: "",
    password:"",
  };


  constructor(private signupService: SignupService) { }

  ngOnInit(): void {
  }

  createAccount(){
    this.signupService.newAccount(this.user).subscribe((res) => {
      console.log("OK");
  });
  }


}
