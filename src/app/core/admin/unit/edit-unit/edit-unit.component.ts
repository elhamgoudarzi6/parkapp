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
  idea: any[] = [];
  team: any[] = [];
  members: any[] = [];
  filteredUnitLocation: any[] = [];
  filteredUnitStatus: any[] = [];
  unitStatus: any[] = [];
  unitLocation: any[] = [];
  formIdea: FormGroup | any;
  formTeam: FormGroup | any;
  myGroup: FormGroup | any;
  formMember: FormGroup | any;
  unit: any;
  form: FormGroup | any;
  type = 'شرکت';
  dataCell: any;
  errorMessages = {
    ceoID: [{ type: 'required', message: 'کد ملی را وارد کنید.' }],
    ceoFullName: [{ type: 'required', message: 'نام را وارد کنید.' }],
    ceoMobile: [{ type: 'required', message: 'شماره همراه را وارد کنید.' }],
  };
  constructor(
    private messageService: MessageService,
    private localStorage: LocalStorageService,
    private service: AdminService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.units = [{ title: 'هسته' }, { title: 'شرکت' }];
    this.unitStatus = [{ title: 'رشد مقدماتی' }, { title: 'رشد' }, { title: 'رشد یافته' }, { title: 'پارکی' }, { title: 'خدماتی' }, { title: 'R & D' }];
    this.unitLocation = [{ title: 'پارک' }, { title: 'مرکز رشد خرم آباد' }, { title: 'مرکز رشد بروجرد' }, { title: 'مرکز رشد الیگودرز' }, { title: 'مرکز رشد دورود' }, { title: 'مرکز رشد دلفان' }, { title: 'مرکز رشد کشاورزی' },]
    this.unit = this.config.data.unit;
    this.idea = this.unit.idea;
    this.team = this.unit.team;
    this.members = this.unit.members;
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

  delIdea(i: any) {
    this.idea.splice(i, 1);
  }
  delMember(i: any) {
    this.members.splice(i, 1);
  }
  delTeam(i: any) {
    this.team.splice(i, 1);
  }

  createForm() {
    this.myGroup = new FormGroup({
      cell: new FormControl(null),
    });
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
      unitType: new FormControl(this.unit.unitType),
      ceoID: new FormControl(this.unit.ceoID, Validators.compose([Validators.required])),
      companyName: new FormControl(this.unit.companyName),
      ceoFullName: new FormControl(this.unit.ceoFullName, Validators.compose([Validators.required])),
      ceoMobile: new FormControl(this.unit.ceoMobile, Validators.compose([Validators.required])),
      ceoPhone: new FormControl(this.unit.ceoPhone),
      companyID: new FormControl(this.unit.companyID),
      members: new FormControl(null),
      idea: new FormControl(null),
      team: new FormControl(null),
      admissionDate: new FormControl(this.unit.admissionDate),
      admissionNum: new FormControl(this.unit.admissionNum),
      unitStatus: new FormControl(this.unit.unitStatus),
      outDate: new FormControl(this.unit.outDate),
      outNum: new FormControl(this.unit.outNum),
      unitLocation: new FormControl(this.unit.unitLocation),
      address: new FormControl(this.unit.address),
    });
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
      this.idea.push({
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
      this.team.push({
        fullName: this.formTeam.value.fullName,
        position: this.formTeam.value.position,
        nationalCode: this.formTeam.value.nationalCode,
      });
    }
    this.formTeam.controls['fullName'].reset();
    this.formTeam.controls['position'].reset();
    this.formTeam.controls['nationalCode'].reset();
  }

  submitForm(): void {
    this.form.patchValue({
      team: this.team,
      idea: this.idea,
      members: this.members,
    });
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
