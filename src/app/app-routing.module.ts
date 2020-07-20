import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { LogoutComponent } from "./logout/logout.component";

const routes: Routes = [
  {
    path: "signup",
    loadChildren: () =>
      import("./signup/signup.module").then((m) => m.SignupModule),
  },
  {
    path: "main",
    loadChildren: () =>
      import("./main/main.module").then((m) => m.MainModule),
  },

  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },

  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "logout",
    component: LogoutComponent,
  },



  // {
  //   path: "signup",
  //   component: SignupLandingComponent,
  // },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
