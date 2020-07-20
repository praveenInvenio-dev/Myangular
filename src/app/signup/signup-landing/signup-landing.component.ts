import { Component, OnInit } from "@angular/core";
import { constants } from 'src/app/constants/constants.model';

@Component({
  selector: "app-signup-landing",
  templateUrl: "./signup-landing.component.html",
  styleUrls: ["./signup-landing.component.css"],
})
export class SignupLandingComponent implements OnInit {
  lang = constants.langz.eng.signup;
  direction = constants.langz.eng.dir;
  constructor() {}

  ngOnInit(): void {}
}
