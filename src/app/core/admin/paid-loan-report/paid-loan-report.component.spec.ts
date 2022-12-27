import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidLoanReportComponent } from './paid-loan-report.component';

describe('PaidLoanReportComponent', () => {
  let component: PaidLoanReportComponent;
  let fixture: ComponentFixture<PaidLoanReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaidLoanReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaidLoanReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
