import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-landingpage",
  templateUrl: "./landingpage.component.html",
  styleUrls: ["./landingpage.component.css"],
})
export class LandingpageComponent implements OnInit {
  direction = "ltr";
  name = "test";
  showRange: boolean = false;
  backgroundImg: any;
  backgroundImg1: any;
  directionz: any;
  constructor(
    public sanitizer: DomSanitizer,
    private router: Router,
    private routers: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.directionz = this.routers.snapshot.queryParamMap.get("lang");
    if (this.directionz != null) localStorage.setItem("lang", this.directionz);
    this.router.navigate(["main/landing"]);
    if (localStorage.getItem("lang") === "ar") {
      this.direction = "ltr";
    } else {
      this.direction = "ltr";
    }

    this.backgroundImg = this.sanitizer.bypassSecurityTrustStyle(
      "url('assets/images/3@2x.png')"
    );
    this.backgroundImg1 = this.sanitizer.bypassSecurityTrustStyle(
      "url('assets/images/4@2x.png')"
    );
  }

  getclickedrange(id) {
    if (id === 11) {
      this.showRange = false;
    } else {
      this.showRange = true;
    }
  }
}
