import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AdminService } from './../../admin.service';
import { LocalStorageService } from './../../../../auth/local-storage.service';
import { MessageService } from 'primeng/api';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-paid-loan',
  templateUrl: './edit-paid-loan.component.html',
  styleUrls: ['./edit-paid-loan.component.scss'],
  providers: [MessageService]

})

export class EditPaidLoanComponent implements OnInit {
  paidLoan: any;
  units: any[] = [];
  approvalTypes: any[] = [];
  paymentPlaces: any[] = [];
  form: FormGroup | any;
  filteredPlaces: any[] = [];
  filteredTypes: any[] = [];
  filteredUnits: any[] = [];
  errorMessages = {
    meetingDate: [{ type: 'required', message: 'تاریخ صورت جلسه را وارد کنید.' }],
    meetingNumber: [{ type: 'required', message: 'شماره صورت جلسه را وارد کنید.' }],
  };

  constructor(
    private messageService: MessageService,
    private localStorage: LocalStorageService,
    private service: AdminService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig) {
    this.approvalTypes = [{ title: 'حمایت مالی' }, { title: 'کمک هزینه' }];
    this.paymentPlaces = [{ title: 'صندوق' }, { title: 'پارک' }];
  }

  ngOnInit(): void {
    this.paidLoan = this.config.data.paidLoan;
    this.getunits();
    this.createForm();
  }
  onSelectPlace(event: any) {
    this.form.controls.paymentPlace.setValue(event.title);
  }
  filterPlace(event: any) {
    this.filteredPlaces = this.paymentPlaces.filter((item: any) => item.title.includes(event.query));
  }
  onSelectUnit(event: any) {
    this.form.controls.unitID.setValue(event._id);
  }
  filterUnit(event: any) {
    this.filteredUnits = this.units.filter((item: any) => item.ceoFullName.includes(event.query) ||
      item.companyName.includes(event.query) || item.unitType.includes(event.query));
  }
  onSelectType(event: any) {
    this.form.controls.approvalType.setValue(event.title);
  }

  filterType(event: any) {
    this.filteredTypes = this.approvalTypes.filter((item: any) => item.title.includes(event.query));
  }

  createForm() {
    this.form = new FormGroup({
      meetingDate: new FormControl(this.paidLoan.meetingDate, Validators.compose([Validators.required])),
      meetingNumber: new FormControl(this.paidLoan.meetingNumber, Validators.compose([Validators.required])),
      guarantorsName: new FormControl(this.paidLoan.guarantorsName),
      paymentDate: new FormControl(this.paidLoan.paymentDate),
      approvedAmount: new FormControl(this.paidLoan.approvedAmount),
      amountPayable: new FormControl(this.paidLoan.amountPayable),
      guarantorMobile: new FormControl(this.paidLoan.guarantorMobile),
      paymentDateFirst: new FormControl(this.paidLoan.paymentDateFirst),
      paymentDateSecond: new FormControl(this.paidLoan.paymentDateSecond),
      paymentDateThird: new FormControl(this.paidLoan.paymentDateThird),
      InstallmentNumber: new FormControl(this.paidLoan.InstallmentNumber),
      InstallmentRemainNumber: new FormControl(this.paidLoan.InstallmentRemainNumber),
      breathingTime: new FormControl(this.paidLoan.breathingTime),
      paymentPlace: new FormControl(this.paidLoan.paymentPlace),
      approvalType: new FormControl(this.paidLoan.approvalType),
      unitID: new FormControl(this.paidLoan.unitID),
    });
  }


  getunits(): any {
    this.service.getAllUnit(this.localStorage.userToken).subscribe((response: { success: boolean; data: any; }) => {
      if (response.success === true) {
        this.units = response.data;
      } else {
        // this.token.checkTokenExamination(response.data, 'admin');
        this.messageService.add({
          severity: 'error',
          summary: ' دریافت اطلاعات ',
          detail: response.data,
        });
      }
    });
  }

  submitForm(): void {
    this.service
      .updatePaidLoan(this.localStorage.userToken,this.paidLoan.id,this.form.value)
      .subscribe((response: { success: boolean; data: any; }) => {
        if (response.success === true) {
          this.ref.close(true);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: ' ثبت اطلاعات ',
            detail: response.data,
          });
        }
      });
  }

}
