import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AppService {
  private dataSource = new BehaviorSubject<any>("");
  data = this.dataSource.asObservable();

  lang: string;

  constructor(private http: HttpClient) {
    if (localStorage.getItem("lang") === "ar") {
      this.lang = "AR";
    } else {
      this.lang = "EN";
    }
  }

  updatedDataSelection(data: any) {
    this.dataSource.next(data);
  }

  logout() {
    let lng;
    if (this.lang === "AR") {
      lng = "A";
    } else {
      lng = "E";
    }
    const httpOptions = {
      headers: new HttpHeaders({
        ichannel: "243",
      }),
    };

    return this.http.get(
      "https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/ZDP_VAT_NW_RG_SRV/VRNHSet(Fbnumz='',PortalUsrz='',Langz='" +
        lng +
        "',Officerz='',Gpartz='',TxnTpz='04',Euser='',Fbguid='')?&$expand=ADDRESSSet,IBANSet,ATTDETSet,CONTACT_PERSONSet,CONTACTDTSet,NOTESSet,QUESTIONSSet,QUESLISTSet,ELGBL_DOCSet&$format=json",
      httpOptions
    );
  }

  getUserInfo() {
    let lng;
    if (this.lang === "AR") {
      lng = "A";
    } else {
      lng = "E";
    }
    return this.http.get(
      "https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/Z_TP_PROFILE_DEMO_SRV/TPFL_HEADERSet(Taxpayerz='" +
        localStorage.getItem("gpart") +
        "',Langz='" +
        lng +
        "')?$expand=TPOC_LIST&$format=json"
    );
  }

  getVatData() {
    let url =
      "https://tstdg1as1.mygazt.gov.sa:8080/sap/opu/odata/SAP/ZDP_VAT_NW_RG_SRV/VRNHSet(Fbnumz=%27%27,PortalUsrz=%27%27,Langz=%27E%27,Officerz=%27%27,Gpartz=%27%27,TxnTpz=%2704%27,Euser=%27%27,Fbguid=%27%27)?&$expand=ADDRESSSet,IBANSet,ATTDETSet,CONTACT_PERSONSet,CONTACTDTSet,NOTESSet,QUESTIONSSet,QUESLISTSet,ELGBL_DOCSet&$format=json&sap-language=" +
      this.lang;
    const httpOptions = {
      headers: new HttpHeaders({
        ichannel: "243",
      }),
    };

    return this.http.get(url, httpOptions);
  }
}
