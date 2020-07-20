import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-old-dashboard',
  templateUrl: './old-dashboard.component.html',
  styleUrls: ['./old-dashboard.component.css']
})
export class OldDashboardComponent implements OnInit {
  url: any;
  title = "Dashboard";
  direction = 'ltr';
  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    // this.url= this.sanitizer.bypassSecurityTrustResourceUrl();
  
    window.open("https://tstdg1as1.mygazt.gov.sa:8080/sap/bc/ui5_ui5/sap/zuibtpdashboard/index.html?sap-theme=sap_bluecrystal&sap-language=EN&sap-client=100&sap-locale=en&sap-rtl=&sap-theme=Green%40https%3A%2F%2Ftstdp1as1.mygazt.gov.sa%3A50001%2Fcom.sap.portal.theming.webdav.themeswebdavlistener%2FGUID46ba1c738cf5e1229b83f171f87492a6&sap-accessibility=&saml2idp=EPD&sap-client=210&val1=00000000000001077065&val2=00000000001000079772&val3=00000001000000086031&val4=00000010000000086456&val5=00001000000000085588&sap-ui-language=EN&sap-theme=sap_bluecrystal%3D","_self")
  }

}
