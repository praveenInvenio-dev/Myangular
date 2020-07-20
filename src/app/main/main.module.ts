import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { MainRoutingModule } from './main-routing.module';
import { OtpComponent } from './otp/otp.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Ui5appComponent } from './ui5app/ui5app.component';
import { OldDashboardComponent } from './old-dashboard/old-dashboard.component';
import { LandingpageComponent } from './landingpage/landingpage.component';



@NgModule({
  declarations: [
    OtpComponent,
    HomeComponent,
    DashboardComponent,
    Ui5appComponent,
    OldDashboardComponent,
    LandingpageComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MainRoutingModule
  ]
})
export class MainModule { }
