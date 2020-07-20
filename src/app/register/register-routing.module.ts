import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RegisterExciseComponent } from './register-excise/register-excise.component';
import { RegisterComponent } from './register-vat/register.component';
const routes: Routes = [
  {
    path: "excise",
    component: RegisterExciseComponent,
  },
  {
    path: "vat",
    component: RegisterComponent,
  },
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class RegisterRoutingModule { }
