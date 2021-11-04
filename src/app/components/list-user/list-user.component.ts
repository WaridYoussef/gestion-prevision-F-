import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { TokenService } from 'src/app/services/token.service';


@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

//current userId
  userId = this.tokenService.getId()!;

  confirmPass = "";

  isUserExist= false;


  name: string = "";

  totalLength: any;
  page: number = 1;

  users: User[] = [];
  managers: User[] = [];
  
  user = {
    id: 0,
    userId : "",
    firstName: "",
    lastName: "",
    admin: false,
    managerId: this.userId,
    email: "",
    password:"",
  };


  clearInputs(){
    this.confirmPass = "",
    this.user = {
      id: 0,
      userId : "",
      firstName: "",
      lastName: "",
      admin: false,
      managerId: this.userId,
      email: "",
      password:"",
    }
    };

    //if radioButton 'manager' selected
    clearManagerInput(){
      this.user.managerId="";
    }
  


  constructor(private userService: UserService, private toastr: ToastrService,private tokenService: TokenService,
     private spinner: NgxSpinnerService) { 
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 500);
   }

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllManagers();
  }

  getAllUsers(){
    this.userService.getAllusers().subscribe((res : User[]) =>{
      this.users = res;
      this.totalLength = res.length;
      if(res.length<=0){
        this.isUserExist = false;
      }else{
        this.isUserExist = true;
      }
    })
  }

  getAllManagers(){
    this.userService.getManagers().subscribe((res : User[]) =>{
      this.managers = res;
    })
  }

  createUser(){
    this.userService.saveUser(this.user).subscribe((res: User) => {
      this.users= [res, ...this.users]
      this.getAllUsers();
      this.getAllManagers();
      this.clearInputs();
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

  edit(user : any){
    this.user= user;

}

updateUser(user: any){
  this.userService.updateUser(user).subscribe((res: User) => {
    this.getAllUsers();
    this.clearInputs()
    this.toastr.success('opération réussie', 'Message', {
      timeOut: 3000, closeButton : true, positionClass: 'toast-top-right'
    })
  }
  ,(error) => {
    this.getAllUsers();
    this.toastr.error('email existe déjà', 'Message', {
     timeOut: 3000, closeButton : true, positionClass: 'toast-top-right'
   })
   console.log(error);
 }
  );
}

deleteUser(user: any){
  this.userService.deleteUser(user).subscribe(() => {
    let index = this.users.indexOf(user);
    this.users.splice(index, 1)
    this.getAllUsers();
    this.toastr.success('opération réussie', 'Message', {
      timeOut: 3000, closeButton : true, positionClass: 'toast-top-right'
    })
  },(error) => {
    this.getAllUsers();
    this.toastr.error('il ya un problème', 'Message', {
     timeOut: 3000, closeButton : true, positionClass: 'toast-top-right'
   })
   console.log(error);
 })
 
}


Search(){
  if(this.name == ""){
    this.ngOnInit();
  }else{
    this.users = this.users.filter((res) => {
      return (res.firstName +" "+ res.lastName).toLocaleLowerCase().match(this.name.toLocaleLowerCase())
    })
  }
  this.totalLength = this.users.length;
}



}
