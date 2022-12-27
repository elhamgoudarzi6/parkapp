import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from './../../../../auth/local-storage.service';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-edit-unit',
  templateUrl: './edit-unit.component.html',
  styleUrls: ['./edit-unit.component.scss'],
  providers: [MessageService]
})
export class EditUnitComponent implements OnInit {
  units: any[] = [];
  filteredUnits: any[] = [];
  unit: any;
  form: FormGroup | any;
  errorMessages = {
    mobile: [
      { type: 'required', message: 'شماره موبایل را وارد کنید.' },
      { type: 'minlength', message: 'شماره موبایل باید 11 رقم باشد.' },
      { type: 'maxlength', message: 'شماره موبایل باید 11 رقم باشد.' },
      { type: 'pattern', message: 'لطفا شماره موبایل معتبر وارد کنید.' },
    ],
    ceoID: [{ type: 'required', message: 'کد ملی را وارد کنید.' }],
    idea: [{ type: 'required', message: 'ایده محوری را وارد کنید.' }],
    members: [{ type: 'required', message: ' اعضا را وارد کنید.' }],
    ceoFullName: [{ type: 'required', message: 'نام را وارد کنید.' }],
    ceoMobile: [{ type: 'required', message: 'شماره همراه را وارد کنید.' }],
  };
  constructor(
    private messageService: MessageService,
    private localStorage: LocalStorageService,
    private service: AdminService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig) {
  }
  ngOnInit(): void {
    this.units = [{ title: 'هسته' }, { title: 'شرکت' }];
    this.unit = this.config.data.unit;
    this.createForm();
  }

  onSelectUnit(event: any) {
    this.form.controls.unitType.setValue(event.title);
  }

  filterUnit(event: any) {
    this.filteredUnits = this.units.filter((item: any) => item.title.includes(event.query));
  }

  createForm() {
    this.form = new FormGroup({
      unitType: new FormControl(this.unit.unitType),
      ceoID: new FormControl(this.unit.ceoID, Validators.compose([Validators.required])),
      companyName: new FormControl(this.unit.companyName),
      ceoFullName: new FormControl(this.unit.ceoFullName, Validators.compose([Validators.required])),
      ceoMobile: new FormControl(this.unit.ceoMobile, Validators.compose([Validators.required])),
      ceoPhone: new FormControl(this.unit.ceoPhone),
      members: new FormControl(this.unit.members, Validators.compose([Validators.required])),
      idea: new FormControl(this.unit.idea, Validators.compose([Validators.required])),
      companyID: new FormControl(this.unit.companyID),
    });
  }

  submitForm(): void {
    this.service
      .updateUnit(this.localStorage.userToken, this.unit._id, this.form.value)
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
