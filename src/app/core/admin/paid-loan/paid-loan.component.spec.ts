import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidLoanComponent } from './paid-loan.component';

describe('PaidLoanComponent', () => {
  let component: PaidLoanComponent;
  let fixture: ComponentFixture<PaidLoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaidLoanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaidLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
