import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Activity } from 'src/app/models/activity';
import { ActivityService } from 'src/app/services/activity.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-activity',
  templateUrl: './list-activity.component.html',
  styleUrls: ['./list-activity.component.css']
})
export class ListActivityComponent implements OnInit {


  userId = this.tokenService.getId()!;

  isActivityExist= false;


  activityName: string = "";

  totalLength: any;
  page: number = 1;

  activities: Activity[] = [];
  
  activity = {
    id: 0,
    name: "",
    managerId: this.userId
  };

  clearactivityInputs(){
    this.activity = {
      id: 0,
      name : "",
      managerId: this.userId
    }
    };

  constructor(private activityService: ActivityService, private userService: UserService,
     private toastr: ToastrService, private spinner: NgxSpinnerService, private tokenService: TokenService) { 

      this.spinner.show();

      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 500);
      
      }

  ngOnInit(): void {
    this.getAllActivities();
  }


  getAllActivities(){
    this.activityService.getAllactivities().subscribe((res : Activity[]) =>{
      this.activities = res;
      this.totalLength = res.length;
      if(res.length<=0){
        this.isActivityExist = false;
      }else{
        this.isActivityExist = true;
      }
    })
  }

  createActivity(){
    this.activityService.saveActivity(this.activity).subscribe((res: Activity) => {
      this.activities= [res, ...this.activities]
      this.getAllActivities();
      this.clearactivityInputs();
      this.toastr.success('opération réussie', 'Message', {
        timeOut: 3000, closeButton : true, positionClass: 'toast-top-right'
      })
  },(error) => {
    this.toastr.error('activité existe déjà', 'Message', {
     timeOut: 3000, closeButton : true, positionClass: 'toast-top-right'
   })
   console.log(error);
 });
  }


  edit(activity : any){
    this.activity= activity;
}

updateActivity(activity: any){
  this.activityService.updateActivity(activity).subscribe((res: Activity) => {
    this.clearactivityInputs();
    this.getAllActivities();
    this.toastr.success('opération réussie', 'Message', {
      timeOut: 3000, closeButton : true, positionClass: 'toast-top-right'
    })
  },(error) => {
    this.getAllActivities();
    this.toastr.error('activité existe déjà', 'Message', {
     timeOut: 3000, closeButton : true, positionClass: 'toast-top-right'
   })
   console.log(error);
 }
  );
}

deleteActivity(activity: any){
  this.activityService.deleteActivity(activity).subscribe(() => {
    let index = this.activities.indexOf(activity);
    this.activities.splice(index, 1)
    this.getAllActivities();
    this.toastr.success('opération réussie', 'Message', {
      timeOut: 3000, closeButton : true, positionClass: 'toast-top-right'
    })
  },(error) => {
    this.getAllActivities();
    this.toastr.error('Il ya un probleme', 'Message', {
     timeOut: 3000, closeButton : true, positionClass: 'toast-top-right'
   })
   console.log(error);
 })
}


Search(){
  if(this.activityName == ""){
    this.ngOnInit();
  }else{
    this.activities = this.activities.filter((res) => {
      return res.name.toLocaleLowerCase().match(this.activityName.toLocaleLowerCase())
    })
  }
  this.totalLength = this.activities.length;
}


}
