import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupLandingComponent } from './signup-landing/signup-landing.component';
import { SignupRoutingModule } from './signup-routing.module';
import { MaterialModule } from '../material.module';
import { IndividualsSignUpComponent } from './individuals-sign-up/individuals-sign-up.component';
import { EstablishmentComponent } from './establishment/establishment.component';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [
    SignupLandingComponent,
    IndividualsSignUpComponent,
    EstablishmentComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    SignupRoutingModule,
    MaterialModule
  ]
})
export class SignupModule { }
