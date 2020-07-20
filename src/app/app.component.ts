import { Component } from "@angular/core";
import { Location } from "@angular/common";
import { ThrowStmt } from "@angular/compiler";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "newApp";
  pathString: string;
  show: boolean = false;
  constructor(location: Location) {
    this.pathString = location.path();
  }

  checkk(){
    if(this.pathString === "/login" || this.pathString === "/otp" ){
      this.show = false;
    }else{
      this.show = true;
    }
  }
}
