import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { SignupLandingComponent } from './signup-landing/signup-landing.component';
import { IndividualsSignUpComponent } from './individuals-sign-up/individuals-sign-up.component';
import { EstablishmentComponent } from './establishment/establishment.component';
const routes: Routes = [
  {
    path: "",
    component: SignupLandingComponent,
  },
  {
    path: "individual",
    component: IndividualsSignUpComponent,
  },
  {
    path: "establishment",
    component: EstablishmentComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class SignupRoutingModule {}
