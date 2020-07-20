import { Component, OnInit, Host, Inject } from "@angular/core";
import {
  MatCalendar,
  MatDatepickerContent,
} from "@angular/material/datepicker";
import { JDNConvertibleCalendar } from "jdnconvertiblecalendar";
import { DateAdapter } from "@angular/material/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { JDNConvertibleCalendarDateAdapter } from "jdnconvertiblecalendardateadapter";

@Component({
  selector: "app-calendar-header",
  template: `
    <mat-select
      placeholder="Calendar Format"
      [formControl]="form.controls['calendar']"
      style="background: #2fbb85;
      color: white;
      padding: 10px;"
    >
      <mat-option *ngFor="let cal of supportedCalendarFormats" [value]="cal">{{
        cal
      }}</mat-option>
    </mat-select>
    <mat-calendar-header></mat-calendar-header>
  `,
  styleUrls: [],
})
export class CalendarComponent<D> implements OnInit {
  datz = [];
  constructor(
    @Host() private _calendar: MatCalendar<JDNConvertibleCalendar>,
    private _dateAdapter: DateAdapter<JDNConvertibleCalendar>,
    private _datepickerContent: MatDatepickerContent<JDNConvertibleCalendar>,
    @Inject(FormBuilder) private fb: FormBuilder
  ) {
    this._dateAdapter.setLocale("ar");
  }

  form: FormGroup;

  supportedCalendarFormats = JDNConvertibleCalendar.supportedCalendars;

  activeFormat;
 

  ngOnInit() {
    this.datz = [];
    this.datz.push(this.supportedCalendarFormats[0]);
    this.datz.push(this.supportedCalendarFormats[2]);
    console.log("lan", this.supportedCalendarFormats);
    this.supportedCalendarFormats = [];
    this.supportedCalendarFormats = this.datz;
    this.activeFormat = "Islamic";

    if (this._dateAdapter instanceof JDNConvertibleCalendarDateAdapter) {
      this.activeFormat = this._dateAdapter.activeCalendar;
    }

    console.log("lan", this.supportedCalendarFormats);
    // build a form for the calendar format selection
    this.form = this.fb.group({
      calendar: [this.activeFormat, Validators.required],
    });

    // update the selected calendar format
    this.form.valueChanges.subscribe((data) => {
      this.convertCalendar(data.calendar);
    });
  }

  /**
   * Converts the date in the current format into the target format.
   *
   * @param {"Gregorian" | "Julian"} calendar the target calendar format.
   */
  convertCalendar(calendar: "Gregorian" | "Julian" | "Islamic") {
    console.log("datebfr",calendar)
    if (this._dateAdapter instanceof JDNConvertibleCalendarDateAdapter) {
      const convertedDate = this._dateAdapter.convertCalendar(
        this._calendar.activeDate,
        calendar
      );
        console.log("dateaft",convertedDate)
      this._calendar.activeDate = convertedDate;

      this._datepickerContent.datepicker.select(convertedDate);

      this._calendar.updateTodaysDate();
    }
  }
}
