import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPaidLoanComponent } from './view-paid-loan.component';

describe('ViewPaidLoanComponent', () => {
  let component: ViewPaidLoanComponent;
  let fixture: ComponentFixture<ViewPaidLoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPaidLoanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPaidLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
