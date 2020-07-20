import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-ui5app',
  templateUrl: './ui5app.component.html',
  styleUrls: ['./ui5app.component.css']
})
export class Ui5appComponent implements OnInit {
  url;
  title;
  direction = 'ltr';
  constructor(public sanitizer: DomSanitizer, public appServ: AppService) {
    this.appServ.data.subscribe(res=>{
      console.log("datatatatata", res)
      // this.url= this.sanitizer.bypassSecurityTrustResourceUrl(res.url);
      // this.title= res.title;
    })

   }

  ngOnInit(): void {
   
    //this.url ="http://localhost:4200/logout";
    console.log("url", this.url)

    this.appServ.data.subscribe(res=>{
      console.log("datatatatata", res)
      this.url= this.sanitizer.bypassSecurityTrustResourceUrl(res.url);
      this.title= res.title;
    })

  }



}
