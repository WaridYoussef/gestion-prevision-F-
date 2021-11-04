import { ActivityService } from './../../services/activity.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AffectationService } from 'src/app/affectation.service';
import { Affectation } from 'src/app/models/affectation';
import { Activity } from 'src/app/models/activity';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

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
    activity_id: null,
    mois: "",
    semaine: "",
    description: "",
    firstName: "",
    lastName: "",
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
      activity_id: null,
      mois: "",
      semaine: "",
      description:"",
      firstName: "",
      lastName: "",
      activity_name: ""
    };
  
  }




  constructor(private affectationService: AffectationService ,private activityService: ActivityService 
    ,private route : ActivatedRoute, private userService: UserService, private toastr: ToastrService,
    private spinner: NgxSpinnerService) { 
      this.spinner.show();

      setTimeout(() => {
        /** spinner ends after 0.5 seconds */
        this.spinner.hide();
      }, 500);
     }

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
      this.toastr.success('opération réussie', 'Message', {
        timeOut: 3000, closeButton : true, positionClass: 'toast-top-right'
      })
  },(error) => {
    this.toastr.error('Affectation existe déjà', 'Message', {
     timeOut: 3000, closeButton : true, positionClass: 'toast-top-right'
   })
   console.log(error);
 });
  }

  edit(affectation : any){
    this.affectation= affectation;
}

updateAffectation(affectation: any){
  this.affectationService.updateAffectation(affectation).subscribe((res: Affectation) => {
    this.clearInputs();
    this.getAffectations();
    this.toastr.success('opération réussie', 'Message', {
      timeOut: 3000, closeButton : true, positionClass: 'toast-top-right'
    })
  },(error) => {
    this.getAffectations();
    this.toastr.error('Affectation existe déjà', 'Message', {
     timeOut: 3000, closeButton : true, positionClass: 'toast-top-right'
   })
   console.log(error);
 }
  );
}


deleteAffectation(affectation: any){
  this.affectationService.deleteAffectation(affectation).subscribe(() => {
    let index = this.affectations.indexOf(affectation);
    this.affectations.splice(index, 1)
    this.getAffectations();
    this.toastr.success('opération réussie', 'Message', {
      timeOut: 3000, closeButton : true, positionClass: 'toast-top-right'
    })
  },(error) => {
    this.getAffectations();
    this.toastr.error('Il ya un probleme', 'Message', {
     timeOut: 3000, closeButton : true, positionClass: 'toast-top-right'
   })
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
