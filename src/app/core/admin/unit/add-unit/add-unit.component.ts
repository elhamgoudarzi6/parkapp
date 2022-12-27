import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AdminService } from './../../admin.service';
import { LocalStorageService } from './../../../../auth/local-storage.service';
import { MessageService } from 'primeng/api';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-add-unit',
  templateUrl: './add-unit.component.html',
  styleUrls: ['./add-unit.component.scss'],
  providers: [MessageService]

})
export class AddUnitComponent implements OnInit {
  units: any[] = [];
  unitStatus: any[] = [];
  unitLocation: any[] = [];
  form: FormGroup | any;
  formIdea: FormGroup | any;
  formTeam: FormGroup | any;
  formMember: FormGroup | any;
  filteredUnits: any[] = [];
  filteredUnitStatus: any[] = [];
  filteredUnitLocation: any[] = [];
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
  ideas: any[] = [];
  teams: any[] = [];
  members: any[] = [];
  type = 'شرکت';
  constructor(
    private messageService: MessageService,
    private localStorage: LocalStorageService,
    private service: AdminService,
    public ref: DynamicDialogRef
  ) {
    this.units = [{ title: 'هسته' }, { title: 'شرکت' }];
    this.unitStatus = [{ title: 'رشد مقدماتی' }, { title: 'رشد' }, { title: 'رشد یافته' }, { title: 'پارکی' }, { title: 'خدماتی' }, { title: 'R & D' }];
    this.unitLocation = [{ title: 'پارک' }, { title: 'مرکز رشد خرم آباد' }, { title: 'مرکز رشد بروجرد' }, { title: 'مرکز رشد الیگودرز' }, { title: 'مرکز رشد دورود' }, { title: 'مرکز رشد دلفان' }, { title: 'مرکز رشد کشاورزی' },]
  }



  ngOnInit(): void {
    this.createForm();
  }
  filterUnitLocation(event: any) {
    this.filteredUnitLocation = this.unitLocation.filter((item: any) => item.title.includes(event.query));
  }
  onSelectUnitLocation(event: any) {
    this.form.controls.unitLocation.setValue(event.title);
  }
  filterUnitStatus(event: any) {
    this.filteredUnitStatus = this.unitStatus.filter((item: any) => item.title.includes(event.query));
  }
  onSelectUnitStatus(event: any) {
    this.form.controls.unitStatus.setValue(event.title);
  }
  onSelectUnit(event: any) {
    this.type = event.title;
    this.form.controls.unitType.setValue(event.title);
  }

  filterUnit(event: any) {
    this.filteredUnits = this.units.filter((item: any) => item.title.includes(event.query));
  }

  addIdea() {
    if (this.formIdea.value.title == null || this.formIdea.value.dateIn == null || this.formIdea.value.dateOut == null) {
      this.messageService.add({
        severity: 'error',
        summary: 'خطا',
        detail: 'لطفا اطلاعات به طور کامل وارد کنید',
      });
    }
    else {
      this.ideas.push({
        title: this.formIdea.value.title,
        dateIn: this.formIdea.value.dateIn,
        dateOut: this.formIdea.value.dateOut,
      });
    }
    this.formIdea.controls['title'].reset();
    this.formIdea.controls['dateIn'].reset();
    this.formIdea.controls['dateOut'].reset();
  }

  addMember() {
    if (this.formMember.value.fullName == null || this.formMember.value.mobile == null || this.formMember.value.position == null || this.formMember.value.nationalCode == null) {
      this.messageService.add({
        severity: 'error',
        summary: 'خطا',
        detail: 'لطفا اطلاعات به طور کامل وارد کنید',
      });
    }
    else {
      this.members.push({
        fullName: this.formMember.value.fullName,
        mobile: this.formMember.value.mobile,
        position: this.formMember.value.position,
        nationalCode: this.formMember.value.nationalCode,
      });
    }
    this.formMember.controls['fullName'].reset();
    this.formMember.controls['mobile'].reset();
    this.formMember.controls['position'].reset();
    this.formMember.controls['nationalCode'].reset();
  }

  addTeam() {
    if (this.formTeam.value.fullName == null || this.formTeam.value.position == null || this.formTeam.value.nationalCode == null) {
      this.messageService.add({
        severity: 'error',
        summary: 'خطا',
        detail: 'لطفا اطلاعات به طور کامل وارد کنید',
      });
    }
    else {
      this.teams.push({
        fullName: this.formTeam.value.fullName,
        position: this.formTeam.value.position,
        nationalCode: this.formTeam.value.nationalCode,
      });
    }
    this.formTeam.controls['fullName'].reset();
    this.formTeam.controls['position'].reset();
    this.formTeam.controls['nationalCode'].reset();
  }

  createForm() {
    this.formIdea = new FormGroup({
      title: new FormControl(null),
      dateIn: new FormControl(null),
      dateOut: new FormControl(null),
    });
    this.formMember = new FormGroup({
      fullName: new FormControl(null),
      mobile: new FormControl(null),
      position: new FormControl(null),
      nationalCode: new FormControl(null),
    });
    this.formTeam = new FormGroup({
      fullName: new FormControl(null),
      position: new FormControl(null),
      nationalCode: new FormControl(null),
    });
    this.form = new FormGroup({
      unitType: new FormControl(null),
      ceoID: new FormControl(null, Validators.compose([Validators.required])),
      companyName: new FormControl(null),
      ceoFullName: new FormControl(null, Validators.compose([Validators.required])),
      ceoMobile: new FormControl(null, Validators.compose([Validators.required])),
      ceoPhone: new FormControl(null),
      members: new FormControl(null),
      idea: new FormControl(null),
      team: new FormControl(null),
      companyID: new FormControl(null),
      admissionDate: new FormControl(null),
      admissionNum: new FormControl(null),
      unitStatus: new FormControl(null),
      outDate: new FormControl(null),
      outNum: new FormControl(null),
      unitLocation: new FormControl(null),
      address: new FormControl(null),
    });
  }

  submitForm(): void {
    this.form.patchValue({
      team: this.teams,
      idea: this.ideas,
      members: this.members,
    });
    this.service
      .registerUnit(this.localStorage.userToken, this.form.value)
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


  /*    clearInput() {
  this.contact.controls['fullName'].reset();
  this.contact.controls['email'].reset();
  this.contact.controls['title'].reset();
  this.contact.controls['message'].reset();
}*/

}
