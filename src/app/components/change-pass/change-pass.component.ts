import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent implements OnInit {


  user!: User;


  userUpd = {
    id: 0,
    userId : "",
    firstName: "",
    lastName: "",
    admin: false,
    managerid: 0,
    email: "",
    password:"",
  };

  confirmPass="";

  changepass = {
    currentPass: "",
    newPass: ""
  }

  clearInputs(){
    this.confirmPass = "",
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

  constructor(private userService: UserService, private toastr: ToastrService, private spinner: NgxSpinnerService) {
     this.spinner.show();

      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 500);
   }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    this.userService.getUser().subscribe((res : User) =>{
      this.user = res;
     
    })
  }

  edit(user : any){
    this.user= user;
}

updateUser(user: any){
  this.userService.updateUser(user).subscribe((res: User) => {
    this.getUser();
    this.clearInputs()
    this.toastr.success('opération réussie', 'Message', {
      timeOut: 3000, closeButton : true, positionClass: 'toast-top-right'
    })
  }
  ,(error) => {
    this.getUser();
    this.toastr.error('email existe déjà', 'Message', {
     timeOut: 3000, closeButton : true, positionClass: 'toast-top-right'
   })
   console.log(error);
 }
  );
}

  updateUserPass(){
    this.userService.updateUserPass(this.changepass).subscribe((res: any) => {
     
      this.toastr.success('opération réussie', 'Message', {
        timeOut: 3000, closeButton : true, positionClass: 'toast-top-right'
      })
    }
    ,(error) => {
      this.toastr.error('Erreur!', 'Message', {
       timeOut: 3000, closeButton : true, positionClass: 'toast-top-right'
     })
     console.log(error);
   }
    );
  }

}
