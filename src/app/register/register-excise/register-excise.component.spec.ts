import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterExciseComponent } from './register-excise.component';

describe('RegisterExciseComponent', () => {
  let component: RegisterExciseComponent;
  let fixture: ComponentFixture<RegisterExciseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterExciseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterExciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
