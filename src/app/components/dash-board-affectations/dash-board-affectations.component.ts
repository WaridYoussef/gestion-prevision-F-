import { Component, OnInit } from '@angular/core';
import { AffectationService } from 'src/app/affectation.service';
import { Affectation } from 'src/app/models/affectation';

@Component({
  selector: 'app-dash-board-affectations',
  templateUrl: './dash-board-affectations.component.html',
  styleUrls: ['./dash-board-affectations.component.css']
})
export class DashBoardAffectationsComponent implements OnInit {

  cmpt = 0

  search: string = "";

  totalLength: any;
  page: number = 1;

  isAffectationExist = false;

  affectations: Affectation[] = [];

  constructor(private affectationService: AffectationService) { }

  ngOnInit(): void {
    this.getDashBoardAffectations();
  }

  getDashBoardAffectations(){
    this.affectationService.getDashboardAffectations().subscribe((res : Affectation[]) =>{
      this.affectations = res;
      this.totalLength = res.length;

      if(res.length<=0){
        this.isAffectationExist = false;
      }else{
        this.isAffectationExist = true;
      }
      
    })
  } 

}
