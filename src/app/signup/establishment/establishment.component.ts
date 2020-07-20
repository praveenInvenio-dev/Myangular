import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-establishment',
  templateUrl: './establishment.component.html',
  styleUrls: ['./establishment.component.css']
})
export class EstablishmentComponent implements OnInit {
  direction="ltr";
  title="Establishment"
  constructor() { }

  ngOnInit(): void {
  }

}
