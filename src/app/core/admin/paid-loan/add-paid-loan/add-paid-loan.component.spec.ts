import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPaidLoanComponent } from './add-paid-loan.component';

describe('AddPaidLoanComponent', () => {
  let component: AddPaidLoanComponent;
  let fixture: ComponentFixture<AddPaidLoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPaidLoanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPaidLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
