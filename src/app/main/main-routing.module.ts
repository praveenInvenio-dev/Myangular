import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { OtpComponent } from './otp/otp.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Ui5appComponent } from './ui5app/ui5app.component';
import { OldDashboardComponent } from './old-dashboard/old-dashboard.component';
import { LandingpageComponent } from './landingpage/landingpage.component';

const routes: Routes = [
  // {
  //   path: "",
  //   component: OtpComponent,
  // } ,
  {
    path: "",
    component: HomeComponent,
    children: [
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      {
        path: "dashboard",
        component: DashboardComponent,
      }
    ],
  },
  {
    path:"ui5",
    component: Ui5appComponent
  },
  {
    path:"oldDashboard",
    component: OldDashboardComponent
  },
  {
    path:"landing",
    component: LandingpageComponent
  },
  {
    path: "register",
    loadChildren: () =>
      import("../register/register.module").then((m) => m.RegisterModule),
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class MainRoutingModule { }
