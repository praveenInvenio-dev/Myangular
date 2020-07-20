import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ui5appComponent } from './ui5app.component';

describe('Ui5appComponent', () => {
  let component: Ui5appComponent;
  let fixture: ComponentFixture<Ui5appComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ui5appComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ui5appComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
