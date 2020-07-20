import { Component, OnInit, HostListener } from "@angular/core";
import { constants } from 'src/app/constants/constants.model';

@Component({
  selector: "app-individuals-sign-up",
  templateUrl: "./individuals-sign-up.component.html",
  styleUrls: ["./individuals-sign-up.component.css"],
})
export class IndividualsSignUpComponent implements OnInit {
  optionActive;
  defaultValue: number = 1;
  showOne: boolean = false;
  showTwo: boolean = false;

  lang = constants.langz.arb.individual;
  direction = constants.langz.arb.dir;
  show: boolean = false;
  innerWidth: number;

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    console.log("soze", this.innerWidth)
  }

  constructor() {}

  ngOnInit(): void {
    this.optionActive = 1;
  }

  NextStep(id) {
    this.optionActive = id;
    if (this.optionActive === 2) {
      this.showOne = true;
    }
    if (this.optionActive === 3) {
      this.showTwo = true;
    }

    this.defaultCss(id);
  }

  defaultCss(id) {
    this.defaultValue += id;
  }

  submit() {
    this.show = true;
  }
}
