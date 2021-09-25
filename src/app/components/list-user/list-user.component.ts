import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  isUserExist= false;


  name: string = "";

  totalLength: any;
  page: number = 1;

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


  clearInputs(){
    this.user = {
      id: 0,
      userId : "",
      firstName: "",
      lastName: "",
      admin: false,
      email: "",
      password:"",
    }
    };
  


  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getAllUsers();
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

  createUser(){
    this.userService.saveUser(this.user).subscribe((res: User) => {
      this.users= [res, ...this.users]
      this.getAllUsers();
      this.clearInputs();
  });
  }

  edit(user : any){
    this.user= user;

}

updateUser(user: any){
  this.userService.updateUser(user).subscribe((res: User) => 
  this.clearInputs()
  );
}

deleteUser(user: any){
  this.userService.deleteUser(user).subscribe(() => {
    let index = this.users.indexOf(user);
    this.users.splice(index, 1)
    this.getAllUsers();
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
