import { Component, OnInit } from "@angular/core";
import { constants } from '../../constants/constants.model';

@Component({
  selector: "app-otp",
  templateUrl: "./otp.component.html",
  styleUrls: ["./otp.component.css"],
})
export class OtpComponent implements OnInit {
  lang = constants.langz.eng.otp;
  constructor() {}

  ngOnInit(): void {
    console.log("sdbsabdas", this.lang)
    this.reload();
  }
  reload() {
    if (localStorage.getItem("isRefreshed") === null) {
      localStorage.setItem("isRefreshed", "1");
      window.location.reload();
    } else {
      console.log("sdasd", localStorage.getItem("isRefreshed"));
    }
  }

  // redirect(){
  //   window.open('http://localhost:2000/#/home', '_self');
  // }
}
