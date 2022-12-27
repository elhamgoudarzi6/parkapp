import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPaidLoanComponent } from './edit-paid-loan.component';

describe('EditPaidLoanComponent', () => {
  let component: EditPaidLoanComponent;
  let fixture: ComponentFixture<EditPaidLoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPaidLoanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPaidLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
