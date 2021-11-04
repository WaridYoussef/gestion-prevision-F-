import { DashBoardAffectationsComponent } from './components/dash-board-affectations/dash-board-affectations.component';
import { ChangePassComponent } from './components/change-pass/change-pass.component';
import { ListAffectationsComponent } from './components/list-affectations/list-affectations.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { PageNotFoundComponent } from "./components/partials/page-not-found/page-not-found.component";
import { AuthGuard } from './guards/auth.guard';
import { AfterAuthGuard } from './guards/after-auth.guard';
import { ListActivityComponent } from './components/list-activity/list-activity.component';
import { AffectationUserComponent } from './components/affectation-user/affectation-user.component';
import { AdminGuard } from './guards/admin.guard';
import { SignUpComponent } from './components/sign-up/sign-up.component';


const routes : Routes = [
        {
        
        path: "",
        component: ListUserComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard, AdminGuard]

        },
        
        {
        path: "user",
        component:ListUserComponent,
        canActivate: [AuthGuard, AdminGuard]
       },
       {
        path: "activity",
        component:ListActivityComponent,
        canActivate: [AuthGuard, AdminGuard]
       },
       {
        path: "affectation/:userId",
        component: ListAffectationsComponent,
        canActivate: [AuthGuard, AdminGuard]
       },
       {
        path: "dashboard",
        component: DashBoardAffectationsComponent,
        canActivate: [AuthGuard, AdminGuard]
       },

       {
       path: "affectationUser",
        component:AffectationUserComponent,
        canActivate: [AuthGuard]
       },
        {
       path: "changePass",
        component:ChangePassComponent,
        canActivate: [AuthGuard]
       },
       {
        path: "signUp",
         component:SignUpComponent
        },
       {
        path: "login",
        component: LoginComponent,
        canActivate: [AfterAuthGuard]
       },
       {
        path: "**",
        component: PageNotFoundComponent
       },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }