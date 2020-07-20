import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { apiconstants } from "../constants/apiConstants";

@Injectable({
  providedIn: "root",
})
export class VatServiceService {
  baseUrl = environment.url;
  lang: string;

  constructor(private http: HttpClient) {
    if (localStorage.getItem("lang") === "ar") {
      this.lang = "AR";
    } else {
      this.lang = "EN";
    }
  }

  getVatTermsAndConditions() {
    return this.http.get(
      this.baseUrl +
        apiconstants.TermsNConditions +
        "(Spras='" +
        this.lang +
        "',Fbtyp='VATR')?$format=json"
    );
  }

  getIBNValidation(ibn) {
    return this.http.get(
      this.baseUrl +
        apiconstants.IBNValidation +
        "HEADERSet(Iban='" +
        ibn +
        "')?sap-language=" +
        this.lang
    );
  }

  getList() {
    let lng;
    if (this.lang === "AR") {
      lng = "A";
    } else {
      lng = "E";
    }
    let url =
      "/sap/opu/odata/SAP/ZDP_VRUH_SRV/VR_UI_HDRSet(Fbnum='',Lang='" +
      lng +
      "',Officer='',Gpart='3311631158',Status='E0001',TxnTp='CRE_RGVT',Formproc='ZTAX_VT_REG')?&$expand=VR_UI_BTNSet,ELGBL_DOCSet&$format=json";
    return this.http.get(this.baseUrl + url);
  }

  getVatData() {
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

  getUserValidation(obj, date) {
    return this.http.get(
      this.baseUrl +
        apiconstants.UserTypeValidation +
        "taxpayer_nameSet(Tin='',Idtype='" +
        obj.type +
        "',Idnum='" +
        obj.idNumber +
        "',Country='',PassExpDt='" +
        date +
        "',TaxpDob='" +
        date +
        "')?sap-language=" +
        this.lang
    );
  }

  submitVat(obj) {
    // let headers = new Headers();
    // headers.append("Accept", "application/json");
    // headers.append("X-Requested-With","X");

    const headers = { Accept: "application/json", "X-Requested-With": "X" };
    // const httpOptions = new HttpHeaders()
    //   .set("Accept", "application/json")
    //   .set("X-Requested-With", "X");
    //this.http.post<any>('https://jsonplaceholder.typicode.com/posts', obj, { headers })
    return this.http.post(this.baseUrl + apiconstants.SubmitVAT, obj, {
      headers,
    });
  }

  attachmentSubmit(obj, obj2, file, obj3) {
    const headers = {
      Accept: "application/json",
      "X-Requested-With": "X",
      Slug: file,
    };
    return this.http.post(
      this.baseUrl +
        apiconstants.Attachment +
        "/AttachSet(OutletRef='',RetGuid='" +
        obj +
        "',Flag='N',Dotyp='" +
        obj2 +
        "',SchGuid='',Srno=1,Doguid='',AttBy='TP')/AttachMedSet?sap-language=" +
        this.lang,
      obj3,
      {
        headers,
      }
    );
  }

  getdatz() {
    let url =
      "sap/opu/odata/SAP/ZDP_ERNW_SRV/ERNHSet(Fbguid='',Fbnumz='',PortalUsrz='',Langz='E',Operationz='02',Officerz='',Gpartz='',Euser='',TxnTpz='CHG_RGEX')?&$expand=ADDRESSSet,ATTDETSet,CONTACT_PERSONSet,CONTACTDTSet,GOODTYPESSet,NOTESSet,WAREHOUSEDTLSet,CRDTLSet&$format=json";
    return this.http.get(this.baseUrl + url);
  }

  getAckDownload(fb) {
    const requestOptions: Object = {
      /* other options here */
      responseType: "blob",
    };
    return this.http.get(
      this.baseUrl + apiconstants.AckDownload + fb + "')/$value?sap-lang=EN",
      requestOptions
    );
  }
}
