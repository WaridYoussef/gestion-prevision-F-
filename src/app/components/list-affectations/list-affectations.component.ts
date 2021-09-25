import { ActivityService } from './../../services/activity.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AffectationService } from 'src/app/affectation.service';
import { Affectation } from 'src/app/models/affectation';
import { Activity } from 'src/app/models/activity';

@Component({
  selector: 'app-list-affectations',
  templateUrl: './list-affectations.component.html',
  styleUrls: ['./list-affectations.component.css']
})
export class ListAffectationsComponent implements OnInit {

  search: string = "";

  totalLength: any;
  page: number = 1;

  isAffectationExist = false;


  id= 0;
  userid = "";
  firstName : string = '';
  lastName : string = '';

 


  affectations: Affectation[] = [];
  activities: Activity[] = [];
  
  affectation = {
    id: 0,
    user_id: this.id,
    activity_id: 0,
    mois: "",
    semaine: "",
    firstName: "",
    activity_name: ""
  };

  activity = {
    id: 0,
    name: "",
  };
  
  clearInputs(){
    this.affectation = {
      id: 0,
      user_id: this.id,
      activity_id: 0,
      mois: "",
      semaine: "",
      firstName: "",
      activity_name: ""
    };
  
  }




  constructor(private affectationService: AffectationService ,private activityService: ActivityService ,private route : ActivatedRoute) { }

  ngOnInit(): void {
   
    this.id = +this.route.snapshot.queryParamMap.get('id')!;
    this.userid = this.route.snapshot.paramMap.get('userId')!;
    this.firstName = this.route.snapshot.queryParamMap.get('firstName')!;
    this.lastName = this.route.snapshot.queryParamMap.get('lastName')!;
    this.getAffectations();
    this.getAllActivities();
  
  }

  getAllActivities(){
    this.activityService.getAllactivities().subscribe((res : Activity[]) =>{
      this.activities = res;
    })
  }

  getAffectations(){
    this.affectationService.getAffectations(this.userid).subscribe((res : Affectation[]) =>{
      this.affectations = res;
      this.totalLength = res.length;

      if(res.length<=0){
        this.isAffectationExist = false;
      }else{
        this.isAffectationExist = true;
      }
      
    })
  } 

  createAffectation(){
    this.affectationService.saveAffectation(this.affectation).subscribe((res: Affectation) => {
      this.affectations= [res, ...this.affectations]
      this.getAffectations();
      this.clearInputs();
  });
  }

  edit(affectation : any){
    this.affectation= affectation;
}

updateAffectation(affectation: any){
  this.affectationService.updateAffectation(affectation).subscribe((res: Affectation) => {
    this.clearInputs();
    this.getAffectations();
  }
  );
}


deleteAffectation(affectation: any){
  this.affectationService.deleteAffectation(affectation).subscribe(() => {
    let index = this.affectations.indexOf(affectation);
    this.affectations.splice(index, 1)
    this.getAffectations();
  })
 
}

Search(){
  if(this.search == ""){
    this.ngOnInit();
  }else{
    this.affectations = this.affectations.filter((res) => {
      return res.semaine.toLocaleLowerCase().match(this.search.toLocaleLowerCase())
    })
  }
  this.totalLength = this.affectations.length;
}


 
}
