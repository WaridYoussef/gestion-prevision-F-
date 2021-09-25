import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/models/activity';
import { ActivityService } from 'src/app/services/activity.service';

@Component({
  selector: 'app-list-activity',
  templateUrl: './list-activity.component.html',
  styleUrls: ['./list-activity.component.css']
})
export class ListActivityComponent implements OnInit {


  isActivityExist= false;


  activityName: string = "";

  totalLength: any;
  page: number = 1;

  activities: Activity[] = [];
  
  activity = {
    id: 0,
    name: "",
  };

  clearactivityInputs(){
    this.activity = {
      id: 0,
      name : "",
    }
    };

  constructor(private activityService: ActivityService) { }

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
  });
  }


  edit(activity : any){
    this.activity= activity;
}

updateActivity(activity: any){
  this.activityService.updateActivity(activity).subscribe((res: Activity) => {
    this.clearactivityInputs();
    this.getAllActivities()
  }
  );
}

deleteActivity(activity: any){
  this.activityService.deleteActivity(activity).subscribe(() => {
    let index = this.activities.indexOf(activity);
    this.activities.splice(index, 1)
    this.getAllActivities();
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
