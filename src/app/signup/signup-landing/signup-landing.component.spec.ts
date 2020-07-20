import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupLandingComponent } from './signup-landing.component';

describe('SignupLandingComponent', () => {
  let component: SignupLandingComponent;
  let fixture: ComponentFixture<SignupLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
