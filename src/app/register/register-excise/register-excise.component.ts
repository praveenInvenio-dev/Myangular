import { Component, OnInit, Inject } from "@angular/core";
import { constants } from 'src/app/constants/constants.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CalendarComponent } from 'src/app/constants/calendar.component';

@Component({
  selector: "app-register-excise",
  templateUrl: "./register-excise.component.html",
  styleUrls: ["./register-excise.component.css"],
})
export class RegisterExciseComponent implements OnInit {
  optionActive;
  defaultValue: number = 1;
  showOne: boolean = false;
  showTwo: boolean = false;
  title = "Register Excise Tax";

  lang;
  direction;
  show: boolean = false;
  tax: string;
  taxList: string[] = ["Yes", "No"];
  form: FormGroup;
  radio3 = '1';
  radio2 = '1';

  headerComponent = CalendarComponent;

  constructor(@Inject(FormBuilder) private fb: FormBuilder) {
    this.form = this.fb.group({
      dateValue: [null, Validators.compose([Validators.required])],
    });

    this.form.valueChanges.subscribe((data) => {
      console.log(data.dateValue);
    });
  }

  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2021, 0, 1);

  ngOnInit(): void {
    this.optionActive = 1;
    if (localStorage.getItem("lang") === "ar") {
      this.lang = constants.langz.arb.excise;
      this.direction = constants.langz.arb.dir;
    } else {
      this.lang = constants.langz.eng.excise;
      this.direction = constants.langz.eng.dir;
    }
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
