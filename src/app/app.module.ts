import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { NavbarComponent } from './components/partials/navbar/navbar.component';
import { PageNotFoundComponent } from './components/partials/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routing.module';
import { JwtInterceptor } from './services/jwt.interceptor';
import { CommonModule } from "@angular/common";
import { ListAffectationsComponent } from './components/list-affectations/list-affectations.component';
import { ListActivityComponent } from './components/list-activity/list-activity.component';
import { AffectationUserComponent } from './components/affectation-user/affectation-user.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { NgxPaginationModule } from 'ngx-pagination';
//search
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [
    AppComponent,
    ListUserComponent,
    NavbarComponent,
    PageNotFoundComponent,
    LoginComponent,
    ListAffectationsComponent,
    ListActivityComponent,
    AffectationUserComponent,
    SignUpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
