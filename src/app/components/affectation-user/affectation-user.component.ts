import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AffectationService } from 'src/app/affectation.service';
import { Affectation } from 'src/app/models/affectation';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-affectation-user',
  templateUrl: './affectation-user.component.html',
  styleUrls: ['./affectation-user.component.css']
})
export class AffectationUserComponent implements OnInit {


  isAffectationExist=false;


  search: string = "";

  totalLength: any;
  page: number = 1;


  id = "";
  name= "";
  affectations: Affectation[] = [];

  constructor(private affectationService: AffectationService, private tokenService: TokenService, private spinner: NgxSpinnerService) {
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 500);
   }

  ngOnInit(): void {
    this.name  = this.tokenService.getName()!;
    this.getAffectations();
    
  }

 getAffectations(){
  this.id  = this.tokenService.getId()!;
  this.affectationService.getAffectations(this.id).subscribe((res : Affectation[]) =>{
    this.affectations = res;
    this.totalLength = res.length;

      if(res.length<=0){
        this.isAffectationExist = false;
      }else{
        this.isAffectationExist = true;
      }
      
    
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
