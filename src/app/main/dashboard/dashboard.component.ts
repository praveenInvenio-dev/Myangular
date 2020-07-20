import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { ViewChild, ElementRef } from "@angular/core";
import { Subject } from "rxjs";
import { Location } from "@angular/common";
import { Label, MultiDataSet, Color } from "ng2-charts";
import { ChartType } from "chart.js";
import { constants } from "src/app/constants/constants.model";
import { AppService } from "src/app/app.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  htmlStr: any;
  pathString: string;
  movies: any;
  url;
  name: string;
  data$: Subject<string> = new Subject();
  @ViewChild("iframe") iframe: ElementRef;
  status: boolean = false;
  fullName;
  drops: boolean = false;
  show: boolean = false;
  direction: string;
  lang;


  constructor(
    //private cookie: CookieService,
    private sanatizer: DomSanitizer,
    public appSer: AppService,
    private router: Router,
    public location: Location,
    public route: ActivatedRoute
  ) {
    this.pathString = location.path();
    console.log("appComponent: pathString...");
    console.log(this.pathString);
  }

  str='<html><body><div><BR/><BR/></h3>Instructions and Conditions</h3><p><BR/><span style="color:blue !important">Please fill the requested information for each step.This application cannot be successfully submitted until all of the mandatory fields and attachments have been completed.<br>Applicants should ensurethat their existing taxpayer details are completed and accurate before registering for VAT.<BR/><BR/>Please refer to the<a style="color: #00679e;font-size: 0.875rem;">&#160;&#160;VAT FAQ &#160;</a>section in the GAZT website before filling out this application form.</span><BR/><BR/>1. For applications on behalf of a company, thisform should be completed by an official contact person of the company and signed by a person who has authority to sign of on behalf of the company. If the provided information is incorrect or incomplete then penalties are added as per Value Added Tax Law withoutinterfering with any penalties applied by other regulations in the Kingdom of Saudi Arabia.<BR/><BR/>2. GAZT reserves the right to obtain financial statements and business records of the company and review them.<BR/><BR/>3. GAZT reserves the right to obtain financial statements and business records to the owner and review them.<BR/><BR/>4. A VAT registration may be cancelled in accordance to the cases listed as per the VAT Law.<BR/><BR/>5. The person registered in VAT tax system must notify GAZT of changing any of the information provided in the registration form, a change or cessation of business activity, or any major changes that affects liability to be VAT registered, in accordance with the VAT Regulations.<BR/><BR/>6. Businesses with 2018 annual taxable supplies that do not exceed SAR 1 million may select an effective registration date up to 1/1/2019.<BR/><BR/>7. I admit my compliance to meet all the requirements and procedures prescribed in the VAT Law and its Implementing Regulations including without limits the below. In the case of non-restriction of VAT system, the General Authority for Zakat and Tax (GAZT) has the full right to apply the proper procedures in accordance with the rules and regulations.<p>* Registration during the specified period, according to the VAT Law and its Regulations.<BR/>* Submitting VAT filing on time based on theannual revenues.<BR/>* Paying VAT payments and any related penalties within the specified period, according to the Regulations<BR/>* Providing all the information, documents and records requested by the GAZT within the specified period, according to the Regulations.<BR/>* Not issue a tax invoice without being effectively registered for VAT purposes.<BR/>* Keeping tax invoices, records and accounting documents within the period which were stipulated by the Regulations<BR/>* GAZT has the right to reassess the submitted filings in accordance with the VAT Law and its Regulations<BR/>* GAZT has the right to reassess the non-submitted filing in accordance with the VAT Law and its Regulations</p></p><BR/></div></body></html>'

  ngOnInit(): void {
    console.log("asdfhfds", localStorage.getItem("lang"));

    this.url = this.sanatizer.bypassSecurityTrustResourceUrl(
      "https://tstdg1as1.mygazt.gov.sa:8080/sap/bc/ui5_ui5/sap/zuip_corrmain/index.html?sap-client=100&sAud=&uPar1=3300091259&sap-ui-language=EN&sys=HTTPS://TSTDG1AS1.MYGAZT.GOV.SA:8080&clientfg=100&UserTin="
    );
    this.getres();
    this.getdata();
    console.log(this.url);

    if (localStorage.getItem("lang") === "ar") {
      this.lang = constants.langz.arb.dashboard;
      this.direction = constants.langz.arb.dir;
    } else {
      this.lang = constants.langz.eng.dashboard;
      this.direction = constants.langz.eng.dir;
    }
  }

  taxPayer = [
    {
      title: "VAT",
      title1: "ضريبة القيمة المضافة",
      icon: "assets/images/VAT01.png",
    },
    {
      title: "Excise",
      title1: "ضريبة السلع الإنتقائية",
      icon: "assets/images/Excesie01.png",
    },
    {
      title: "Zakat",
      title1: "الزكاة",
      icon: "assets/images/Zakat@2x.png",
    },
    {
      title: "Witholding",
      title1: "ضريبة الاستقطاع",
      icon: "assets/images/tax (1)@2x.png",
    },
  ];
  inbox = [
    {
      t1: "Mail Title 1",
      t2: "Mail Description can ...",
      t4: "عنوان البريد",
      t5: "محتوى البريد...........",
      t3: "25/03/20",
      icon: "fa fa-ellipsis-v",
    },
    {
      t1: "Mail Title 2",
      t2: "Mail Description can ...",
      t4: "عنوان البريد",
      t5: "محتوى البريد...........",
      t3: "25/03/20",
      icon: "fa fa-ellipsis-v",
    },
    {
      t1: "Mail Title 3",
      t2: "Mail Description can ...",
      t4: "عنوان البريد",
      t5: "محتوى البريد...........",
      t3: "25/03/20",
      icon: "fa fa-ellipsis-v",
    },
    {
      t1: "Mail Title 4",
      t2: "Mail Description can ...",
      t4: "عنوان البريد",
      t5: "محتوى البريد...........",
      t3: "25/03/20",
      icon: "fa fa-ellipsis-v",
    },
  ];

  help = [
    {
      title: "Contact Us",
      t2: "تواصل معنا",
      icon: "assets/images/customer-service@2x.png",
    },
    {
      title: "FAQs",
      t2: "الأسئلة الشائعة",
      icon: "assets/images/faq@2x.png",
    },
    {
      title: "Chat",
      t2: "المحادثة",
      icon: "assets/images/support (1)@3x.png",
    },
  ];

  reD() {
    if (this.show) {
      this.show = false;
    } else {
      this.show = true;
    }

    if (this.show) {
      window.open(
        "https://tstdg1as1.mygazt.gov.sa:8080/sap/bc/ui5_ui5/sap/zuip_corrmain/index.html?sap-theme=sap_bluecrystal&sap-language=EN&sap-client=500&sap-locale=en",
        "_self"
      );
    }
  }

  getdata() {
    this.appSer.logout().subscribe((res) => {
      console.log("sadsaad", res);
    });
  }

  doughnutChartLabels: Label[] = ["Paid", "Pending", "Unpaid"];
  doughnutChartData: MultiDataSet = [[55, 25, 20]];
  public lineChartColors: Color[] = [
    {
      backgroundColor: ["#065e49", "#d39e05", "#808080"],
    },
  ];

  doughnutChartLabels1: Label[] = ["Submitted", "Overdue", "Unsubmitted"];
  doughnutChartData1: MultiDataSet = [[25, 65, 10]];
  public lineChartColors1: Color[] = [
    {
      backgroundColor: ["#065e49", "#d39e05", "#808080"],
    },
  ];
  doughnutChartType: ChartType = "doughnut";

  SidebarCollapse() {
    if (this.status) {
      this.status = false;
    } else {
      this.status = true;
    }
  }
  dropdownz() {
    if (this.drops) {
      this.drops = false;
    } else {
      this.drops = true;
    }
  }

  open(data) {
    console.log(data.url);
    this.appSer.updatedDataSelection(data);
    this.router.navigate(["main/ui5"]);
    // window.open(url, "_self");
  }

  getres() {
    const data = {
      _id: "5ed5039af1734d6a836cfab1",
      name: "Gazt",
      tinNumber: "3300091259",
      menu: [
        {
          title: "VAT Return",
          t2: "إقرارات ضريبة القيمة المضافة",
          url:
            "https://tstdg1as1.mygazt.gov.sa:8080/sap/bc/ui5_ui5/sap/zuip_corrmain/index.html?sap-client=100&sAud=&uPar1=3300101211&sap-ui-language=EN&sys=HTTPS://TSTDG1AS1.MYGAZT.GOV.SA:8080&clientfg=100&UserTin=",
          icon: "assets/images/balance-sheet@2x.png",
          flag: true,
          icon2: "assets/images/balance-sheet1.png",
        },
        {
          title: "Tax Certificates",
          t2: "الشهادات الضريبية",
          url:
            "https://tstdg1as1.mygazt.gov.sa:8080/sap/bc/ui5_ui5/sap/zuip_corrmain/index.html?sap-client=100&sAud=&uPar1=3300101211&sap-ui-language=EN&sys=HTTPS://TSTDG1AS1.MYGAZT.GOV.SA:8080&clientfg=100&UserTin=",
          icon: "assets/images/patent@2x.png",
          flag: true,
          icon2: "assets/images/patent1.png",
        },
        {
          title: "Zakat Return",
          t2: "إقرارات الزكاة",
          url:
            "https://tstdg1as1.mygazt.gov.sa:8080/sap/bc/ui5_ui5/sap/zd_tax01ret_wi/index.html?sap-client=100&fGUID=005056B1365C1EEAAA9451F8188E496D&uPar=3300091259&bpnum=3300091259&sAud=&UserTin=&sap-ui-language=EN&taxTp=Z",
          icon: "assets/images/ZAKAT Return@2x.png",
          flag: true,
          icon2: "assets/images/Zakat Return1.png",
        },
        {
          title: "Bill Payments",
          t2: "دفع الفواتير",
          url:
            "https://tstdg1as1.mygazt.gov.sa:8080/sap/bc/ui5_ui5/sap/zuibmybill/index.html?sap-client=100&sap-ui-language=EN&Euser=00000010000000084520&fGUID=005056B1365C1EDAAFD1428337E5E354",
          icon: "assets/images/balance-sheet@2x.png",
          flag: true,
          icon2: "assets/images/bill payment1.png",
        },
       
        {
          title: "Authorization",
          t2: "إلغاء التسجيل",
          url:
            "https://tstdg1as1.mygazt.gov.sa:8080/sap/bc/ui5_ui5/sap/zd_tax01ret_wi/index.html?sap-client=100&fGUID=005056B1365C1EEAAA9451F8188E496D&uPar=3300091259&bpnum=3300091259&sAud=&UserTin=&sap-ui-language=EN&taxTp=Z",
          icon: "assets/images/bill payment@3x.png",
          flag: false,
          icon2: "assets/images/contract.png",
        },
      ],
    };

    this.htmlStr = data;
    this.movies = data.menu;
  }

  taxArray = [
    {
      value: 1,
    },
    {
      value: 2,
    },
    {
      value: 3,
    },
    {
      value: 4,
    },
    {
      value: 5,
    },
  ];

  delete(index: any) {
    this.movies.splice(index, 1);
  }

  addNew() {
    this.movies.push({
      name: "new item",
      isDisable: false,
    });
  }

  logout() {
    this.router.navigate(["logout"]);
    // this.appSer.logout().subscribe((res) => {
    //   console.log("res", res);
    //   this.router.navigate(["login"]);
    // });
  }
}
