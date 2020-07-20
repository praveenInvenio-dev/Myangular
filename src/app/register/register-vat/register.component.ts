import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Options } from "ng5-slider";
import { constants } from "src/app/constants/constants.model";
import { AppService } from "src/app/app.service";
import { VatServiceService } from "src/app/services/vat-service.service";
import { DatePipe } from "@angular/common";
import { DateAdapter } from "@angular/material/core";
import { JDNConvertibleCalendar } from "jdnconvertiblecalendar";
import { VATConstants } from "src/app/constants/VATConstants";
import { DomSanitizer } from "@angular/platform-browser";
import { NotifierService } from "angular-notifier";
import { TooltipConstants } from "src/app/constants/tooltip";
import * as FileSaver from "file-saver";

declare var $: any;
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  @ViewChild("content") content: any;

  show: boolean = false;
  vatFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isEditable = false;
  value: number = 5;
  questionSet = VATConstants.QUESTIONSSet;
  contactSet = VATConstants.CONTACT_PERSONSet;
  contact2Set = VATConstants.CONTACTDTSet;

  radio1 = "1";
  radio2 = "1";
  radio3 = "1";
  name = "";
  no = "";
  date = new Date().toDateString();

  lang;
  direction;
  options: Options = {
    showTicksValues: true,
    stepsArray: [
      { value: 1, legend: "Less" },
      { value: 2, legend: "187,500 SAR" },
      { value: 3, legend: "375,000 SAR" },
      { value: 4, legend: "1,000,000 SAR" },
      { value: 5, legend: "40,000,000 SAR" },
      { value: 6, legend: "Greater" },
    ],
  };

  optionActive;
  defaultValue: number = 1;
  showOne: boolean = false;
  showTwo: boolean = false;
  //direction = "ltr";
  title = "Register VAT";
  submitted: boolean;
  htmlStr: any;
  vatObject: Object;
  vatSecondFormGroup: FormGroup;
  submitted2: boolean;

  myFiles: string[] = [];
  sMsg: string = "";
  attachList: any;
  vatFormThirdGroup: FormGroup;
  submitted3: boolean;
  showRange: boolean;
  showRange1: boolean;
  backgroundImg: any;
  backgroundImg1: any;
  dynamicRow = [
    {
      id: 1,
      upload: false,
    },
  ];
  returnId: any;
  ibanErr;
  numErr: boolean = false;
  iBanList = [];
  showIban: boolean;
  tool1 = TooltipConstants.vatTooltip[0].tool1;
  tinErr: boolean = false;
  tinMsg: string;
  idErr: boolean = false;
  idErr1: boolean = false;
  idMsg: string;
  tinDisbaled: boolean = true;
  qErr1: boolean = false;
  qErr2: boolean = false;
  qMsg: string;
  checkErr: boolean = false;
  checkMsg: string;
  hname: string;
  showModalBox: boolean = false;
  resText: any;
  resText1: any;
  checkErr1: boolean = false;
  fileNames: any = [];
  // minDate: Date;
  // maxDate = new Date(2021, 0, 1);

  constructor(
    private _formBuilder: FormBuilder,
    public appSrv: AppService,
    public vatService: VatServiceService,
    public datePipe: DatePipe,
    private _dateAdapter: DateAdapter<JDNConvertibleCalendar>,
    public sanitizer: DomSanitizer,
    public notifierService: NotifierService
  ) {}
  dat: Date;
  minDate = new Date(2000, 0, 1);
  maxDate = new Date(2021, 0, 1);
  ngOnInit() {
    this.hname = localStorage.getItem("name");
    this.date = this.datePipe.transform(this.date, "dd/MM/yyyy");
    this.optionActive = 1;
    this.minDate = new Date("2015-03-25");
    this.vatFormGroup = this._formBuilder.group({
      veStartDate: [this.dat, Validators.required],
      impOrExp: ["", Validators.required],
      bankAcc: [0, Validators.required],
      ibn: ["", Validators.pattern("^[a-zA-Z0-9]*$")],
    });
    this.vatSecondFormGroup = this._formBuilder.group({
      qrange1: ["", Validators.required],
      qrange2: ["", Validators.required],
      qrange3: [""],
      qrange4: [""],
      docType: [""],
      gPart: [""],
      type: ["", Validators.required],
      idNumber: ["", Validators.required],
      dob: [this.dat, Validators.required],
      name: [""],
      lname: [""],
      mobile: [""],
      email: [""],
    });
    this.vatFormThirdGroup = this._formBuilder.group({
      DecidTy: ["", Validators.required],
      DecidNo: ["", Validators.required],
      Decname: ["", Validators.required],
      dob: [this.dat, Validators.required],
      AgrFg: [false],
      Decfg: [false],
    });

    if (localStorage.getItem("lang") === "ar") {
      this.lang = constants.langz.arb.vat;
      this.direction = constants.langz.arb.dir;
    } else {
      this.lang = constants.langz.eng.vat;
      this.direction = constants.langz.eng.dir;
    }

    this.getVatData();
    this.getList();
    this.getdatz();
    //this.getTermsAndCondition();
    this.backgroundImg = this.sanitizer.bypassSecurityTrustStyle(
      "url('assets/images/3@2x.png')"
    );
    this.backgroundImg1 = this.sanitizer.bypassSecurityTrustStyle(
      "url('assets/images/4@2x.png')"
    );
  }

  getdatz() {
    this.vatService.getdatz().subscribe((res) => {
      console.log("et", res);
    });
  }

  get f() {
    return this.vatFormGroup.controls;
  }

  get f2() {
    return this.vatSecondFormGroup.controls;
  }

  get f3() {
    return this.vatFormThirdGroup.controls;
  }

  getList() {
    this.vatService.getList().subscribe(
      (res) => {
        this.attachList = res["d"]["ELGBL_DOCSet"]["results"];
        console.log("sdfsdaf", this.attachList);
      },
      (err) => {
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
      }
    );
  }

  getTermsAndCondition() {
    this.vatService.getVatTermsAndConditions().subscribe(
      (res) => {
        console.log("hrml", res);
        this.htmlStr = res["d"]["Zterms"];
        console.log("hrml", this.htmlStr);
      },
      (err) => {
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
      }
    );
  }

  ackDownload() {
    this.vatService.getAckDownload(this.no).subscribe(
      (res: any) => {
        console.log("res", res);
        FileSaver.saveAs(res, "vat.pdf");
      },
      (err) => {
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
      }
    );
  }

  validateibn(value) {
    this.submitted = true;
    let first = value.substr(0, 2);
    let sec = value.substr(2);
    if (first === "SA") {
      if (sec.length == 22) {
        if (isNumber(sec)) {
          this.numErr = false;
          this.vatService.getIBNValidation(value).subscribe(
            (res) => {
              this.notifierService.notify("success", "Valid IBAN");
              console.log("resadas", res);
              let val = {
                id: this.iBanList.length,
                data: value,
              };
              this.iBanList.push(val);
              this.showIban = true;
            },
            (err) => {
              this.notifierService.notify(
                "error",
                err.error.error.innererror.errordetails[0].message
              );
              console.log(err);
            }
          );
        } else {
          this.numErr = true;
          this.ibanErr = "Please Enter Alphanumeric Value";
        }
      } else {
        this.numErr = true;
        this.ibanErr = "Please Enter 24 characters";
      }
    } else {
      this.numErr = true;
      this.ibanErr = "IBAN Number should start from SA";
    }
    console.log("test ", first, "sdfsd ", sec);
  }

  getFileDetails(e, id) {
    //console.log (e.target.files);
    for (var i = 0; i < e.target.files.length; i++) {
      this.myFiles.push(e.target.files[i]);
    }

    this.uploadFiles(id);
    console.log(this.myFiles);
    this.fileNames = [];
    for (var i = 0; i < this.myFiles.length; i++) {
      console.log(this.myFiles[i]["name"]);
      let n = this.myFiles[i]["name"];
      this.fileNames.push(n);
    }

    console.log(this.fileNames);
  }

  uploadFiles(id) {
    const frmData = new FormData();
    let filename;
    for (var i = 0; i < this.myFiles.length; i++) {
      filename = this.myFiles[i]["name"];
      frmData.append("fileUpload", this.myFiles[i]);
    }
    console.log("res", filename, this.myFiles);
    this.vatService
      .attachmentSubmit(
        this.returnId,
        this.vatSecondFormGroup.value.docType,
        filename,
        frmData
      )
      .subscribe(
        (res) => {
          console.log("res");
          this.dynamicRow[id].upload = true;
          this.notifierService.notify(
            "success",
            "Successfully uploaded the file"
          );
        },
        (err) => {
          this.notifierService.notify(
            "error",
            err.error.innererror.errordetails[0].message
          );
        }
      );
  }

  deleteFile(ind) {
    this.dynamicRow[ind].upload = false;
    this.myFiles.splice(ind, 1);
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.vatFormGroup.invalid || this.numErr) {
      return;
    }
    // display form values on success
    console.log(this.vatFormGroup);
    // let datez = this.datePipe.transform(
    //   this.vatFormGroup.value.veStartDate,
    //   "yyyy-MM-dd"
    // );

    console.log("dates");

    let d = this.vatFormGroup.value.veStartDate.calendarStart;
    if (d.day < 10) {
      d.day = "0" + d.day;
    }
    if (d.month < 10) {
      d.month = "0" + d.month;
    }
    let currentdate = d.year + "-" + d.month + "-" + d.day + "T00:00:00";

    console.log(this.vatFormGroup.value.veStartDate, currentdate);

    this.vatObject["d"]["CrStdt"] = currentdate;
    this.vatObject["d"]["VatDt"] = currentdate;
    this.vatObject["d"]["VatTaxDt"] = currentdate;
    this.vatObject["d"]["OptIban"] = this.vatFormGroup.value.ibn;
    if (this.vatFormGroup.value.impOrExp === "1") {
      this.vatObject["d"]["ImFg"] = "1";
      this.vatObject["d"]["ExFg"] = "0";
    } else if (this.vatFormGroup.value.impOrExp === "2") {
      this.vatObject["d"]["ImFg"] = "0";
      this.vatObject["d"]["ExFg"] = "1";
    } else {
      this.vatObject["d"]["ImFg"] = "1";
      this.vatObject["d"]["ExFg"] = "1";
    }
    console.log("resdata", this.vatObject);
    this.NextStep(2);
  }

  onSubmit2() {
    this.submitted2 = true;
    if (this.vatSecondFormGroup.value.qrange3 === "") {
      this.qErr1 = true;
      this.qMsg = "Please select any one option";
    }
    if (this.vatSecondFormGroup.value.qrange4 === "") {
      this.qErr2 = true;
      this.qMsg = "Please select any one option";
    }
    // stop here if form is invalid
    if (this.vatSecondFormGroup.invalid || this.tinErr || this.idErr) {
      return;
    }
    // display form values on success
    let d = this.vatSecondFormGroup.value.dob.calendarStart;
    // if (d.day < 10) {
    //   d.day = "0" + d.day;
    // }
    if (d.month < 10) {
      d.month = "0" + d.month;
    }
    let currentdate = d.year + d.month + d.day;

    //this.getUserValidation(this.vatSecondFormGroup.value, currentdate);

    this.getRangeArray(
      this.vatSecondFormGroup.value.qrange1,
      this.vatSecondFormGroup.value.qrange2
    );
    let currentdate2 = "2020-07-01T00:00:00";
    this.contactSet[0].Gpart = this.vatSecondFormGroup.value.gPart;
    this.contactSet[0].Type = this.vatSecondFormGroup.value.type;
    this.contactSet[0].Idnumber = this.vatSecondFormGroup.value.idNumber;
    this.contactSet[0].Dobdt = currentdate2;
    this.contactSet[0].Firstnm = this.vatSecondFormGroup.value.name;
    this.contactSet[0].Lastnm = this.vatSecondFormGroup.value.lname;
    this.contact2Set[0].SmtpAddr = this.vatSecondFormGroup.value.email;
    this.contact2Set[0].MobNumber = this.vatSecondFormGroup.value.mobile;
    this.vatObject["d"]["CONTACT_PERSONSet"]["results"] = this.contactSet;
    this.vatObject["d"]["CONTACTDTSet"]["results"] = this.contact2Set;
    this.NextStep(3);
  }

  onSubmit3() {
    this.submitted3 = true;
    // stop here if form is invalid
    if (this.vatFormThirdGroup.invalid || this.idErr1) {
      return;
    }
    if (this.vatFormThirdGroup.value.Decfg) {
      this.checkErr = false;
      this.vatObject["d"]["Decfg"] = "1";
    } else {
      this.checkMsg = "Please accept terms and condition";
      this.checkErr = true;
    }

    if (this.vatFormThirdGroup.value.AgrFg) {
      this.checkErr1 = false;
      this.vatObject["d"]["AgrFg"] = "1";
    } else {
      this.checkMsg = "Please accept terms and condition";
      this.checkErr1 = true;
    }

    this.vatObject["d"]["DecidTy"] = this.vatFormThirdGroup.value.DecidTy;
    this.vatObject["d"]["DecidNo"] = this.vatFormThirdGroup.value.DecidNo;
    this.vatObject["d"]["Decname"] = this.vatFormThirdGroup.value.Decname;

    if (this.vatFormThirdGroup.value.AgrFg) this.vatObject["d"]["AgrFg"] = "1";

    console.log(this.vatFormThirdGroup.value);
    console.log("resdata", this.vatObject);
    this.submitVAT();
  }
  getUserValidation() {
    let d = this.vatSecondFormGroup.value.dob.calendarStart;
    if (d.day < 10) {
      d.day = "0" + d.day;
    }
    if (d.month < 10) {
      d.month = "0" + d.month;
    }
    let currentdate = d.year + d.month + d.day;
    if (!this.idErr) {
      this.vatService
        .getUserValidation(this.vatSecondFormGroup.value, currentdate)
        .subscribe(
          (res) => {
            console.log("res", res);
            this.vatSecondFormGroup.controls["gPart"].setValue(res["d"]["Tin"]);
            this.vatSecondFormGroup.controls["name"].setValue(
              res["d"]["Name1"]
            );
            this.vatSecondFormGroup.controls["lname"].setValue(
              res["d"]["Name2"]
            );
            this.vatSecondFormGroup.controls["mobile"].setValue(
              res["d"]["Mobile"]
            );
            this.vatSecondFormGroup.controls["email"].setValue(
              res["d"]["Email"]
            );

            this.vatSecondFormGroup.get("gPart").disable();
            this.vatSecondFormGroup.get("name").disable();
            this.vatSecondFormGroup.get("lname").disable();
            this.vatSecondFormGroup.get("mobile").disable();
            this.vatSecondFormGroup.get("email").disable();
            this.notifierService.notify("success", "Valid ID Number");
          },
          (err) => {
            console.log();
            this.notifierService.notify(
              "error",
              err.error.innererror.errordetails[0].message
            );
          }
        );
    }
  }

  getRangeArray(data, data2) {
    if (data !== "") {
      this.questionSet[data - 1].QoptAns = "1";
    }
    if (data2 !== "") {
      this.questionSet[data2 + 4].QoptAns = "1";
    }
    this.vatObject["d"]["QUESTIONSSet"]["results"] = this.questionSet;
    console.log("vat", this.vatObject["d"]);
  }

  getclickedrange(id) {
    if (id === 10) {
      this.showRange = true;
      this.questionSet[id].QoptAns = "1";
      this.questionSet[id + 1].QoptAns = "0";
    } else if (id === 11) {
      this.showRange = false;
      this.questionSet[id - 1].QoptAns = "0";
      this.questionSet[id].QoptAns = "1";
    } else if (id === 12) {
      this.showRange1 = true;
      this.questionSet[id].QoptAns = "1";
      this.questionSet[id + 1].QoptAns = "0";
    } else {
      this.showRange1 = false;
      this.questionSet[id - 1].QoptAns = "0";
      this.questionSet[id].QoptAns = "1";
    }
  }

  submitVAT() {
    this.vatObject["d"]["Operationz"] = "01";
    console.log("this.vatObject", this.vatObject);
    this.vatService.submitVat(this.vatObject).subscribe(
      (res) => {
        console.log("res", res);
        this.notifierService.notify(
          "success",
          "Successfully Done with VAT Registration"
        );
        this.show = true;
        this.name = res["d"]["CrNm"];
        this.no = res["d"]["Fbnumz"];
      },
      (err) => {
        this.notifierService.notify(
          "error",
          err.error.error.innererror.errordetails[0].message
        );
      }
    );
  }

  onReset() {
    this.submitted = false;
    this.vatFormGroup.reset();
  }

  getVatData() {
    this.vatService.getVatData().subscribe(
      (res) => {
        this.showModalBox = false;
        console.log("resdata", res);
        this.vatObject = res;
        this.returnId = this.vatObject["d"]["ReturnIdz"];
        console.log("resdata", this.vatObject, this.returnId);
      },
      (err) => {
        $("#aftsubmit").modal("show");
        this.showModalBox = true;
        this.resText = err.error.error.innererror.errordetails[0].message;
        this.resText1 = err.error.error.innererror.errordetails[1].message;
        // this.notifierService.notify(
        //   "error",
        //   err.error.error.innererror.errordetails[0].message
        // );
      }
    );
  }

  // getUserValidation(){
  //   this.vatService.getUserValidation().subscribe(res=>{

  //   })
  // }

  NextStep(id) {
    console.log("sdfsdf", id);
    this.optionActive = id;
    if (this.optionActive === 1) {
      this.showOne = false;
      this.showTwo = false;
      this.defaultValue = 1;
    } else {
      if (this.optionActive === 2) {
        this.showOne = true;
      }
      if (this.optionActive === 3) {
        this.showTwo = true;
      }

      this.defaultCss(id);
    }
  }

  defaultCss(id) {
    this.defaultValue += id;
  }

  submit() {
    this.show = true;
    this.submitVAT();
  }

  addRow() {
    let val = {
      id: 2,
      upload: false,
    };
    this.dynamicRow.push(val);
  }
  deleteRow(i) {
    this.dynamicRow.splice(i, 1);
  }

  tinValidation(value) {
    let first = value.substr(0, 1);
    if (first !== "3") {
      this.tinErr = true;
      this.tinMsg = "TIN should start from 3";
    } else {
      if (value.length === 10) {
        this.tinErr = false;
      } else {
        this.tinErr = true;
        this.tinMsg = "TIN should contain 10 characters";
      }
    }
    console.log("tin");
  }
  IDtypeValidation() {
    let type = this.vatSecondFormGroup.value.type;
    let id = this.vatSecondFormGroup.value.idNumber;
    let first = id.substr(0, 1);
    if (type === "ZS0001") {
      if (first === "1") {
        if (id.length === 10) {
          if (isNumber(id)) {
            this.idErr = false;
          } else {
            this.idErr = true;
            this.idMsg = "ID Number Should be numeric";
          }
        } else {
          this.idErr = true;
          this.idMsg = "ID Number Should contain 10 characters";
        }
      } else {
        this.idErr = true;
        this.idMsg = "ID Number Should start from 1 for National ID";
      }
    }

    if (type === "ZS0002") {
      if (first === "2") {
        if (id.length === 10) {
          this.idErr = false;
          //this.getUserValidation(this.vatSecondFormGroup.value, currentdate);
        } else {
          this.idErr = true;
          this.idMsg = "ID Number Should contain 10 characters";
        }
      } else {
        this.idErr = true;
        this.idMsg = "ID Number Should start from 2 for Iqama ID";
      }
    }
  }

  IDtypeValidation1() {
    let type = this.vatFormThirdGroup.value.DecidTy;
    let id = this.vatFormThirdGroup.value.DecidNo;
    let first = id.substr(0, 1);
    if (type === "ZS0001") {
      if (first === "1") {
        if (id.length === 10) {
          if (isNumber(id)) {
            this.idErr1 = false;
          } else {
            this.idErr1 = true;
            this.idMsg = "ID Number Should be numeric";
          }
        } else {
          this.idErr1 = true;
          this.idMsg = "ID Number Should contain 10 characters";
        }
      } else {
        this.idErr1 = true;
        this.idMsg = "ID Number Should start from 1 for National ID";
      }
    }

    if (type === "ZS0002") {
      if (first === "2") {
        if (id.length === 10) {
          this.idErr1 = false;
          //this.getUserValidation(this.vatSecondFormGroup.value, currentdate);
        } else {
          this.idErr1 = true;
          this.idMsg = "ID Number Should contain 10 characters";
        }
      } else {
        this.idErr1 = true;
        this.idMsg = "ID Number Should start from 2 for Iqama ID";
      }
    }
  }
}

function isNumber(n) {
  return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
}
