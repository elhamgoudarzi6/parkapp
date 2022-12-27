import { AngularMaterialListModule } from './../../angular-material-list.module';
import { PrimengListModule } from './../../primeng-list.module';
import { AdminRoutingModule } from './admin-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { UnitComponent } from './unit/unit.component';
import { AddUnitComponent } from './unit/add-unit/add-unit.component';
import { PaidLoanComponent } from './paid-loan/paid-loan.component';
import { AddPaidLoanComponent } from './paid-loan/add-paid-loan/add-paid-loan.component';
import { ViewPaidLoanComponent } from './paid-loan/view-paid-loan/view-paid-loan.component';
import { ViewUnitComponent } from './unit/view-unit/view-unit.component';
import { AdministratorsComponent } from './administrators/administrators.component';
import { AdministratorAddComponent } from './administrators/administrator-add/administrator-add.component';
import { AdministratorEditComponent } from './administrators/administrator-edit/administrator-edit.component';
import { AdministratorDetailsComponent } from './administrators/administrator-details/administrator-details.component';
import { AdministratorSecurityComponent } from './administrators/administrator-security/administrator-security.component';
import { EditUnitComponent } from './unit/edit-unit/edit-unit.component';
import { EditPaidLoanComponent } from './paid-loan/edit-paid-loan/edit-paid-loan.component';
import { UnitReportComponent } from './unit-report/unit-report.component';
import { PaidLoanReportComponent } from './paid-loan-report/paid-loan-report.component';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { HomeComponent } from './home/home.component';
import {NgxPrintModule} from 'ngx-print';

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    LoginComponent,
    UnitComponent,
    AddUnitComponent,
    PaidLoanComponent,
    AddPaidLoanComponent,
    ViewPaidLoanComponent,
    ViewUnitComponent,
    AdministratorsComponent,
    AdministratorAddComponent,
    AdministratorEditComponent,
    AdministratorDetailsComponent,
    AdministratorSecurityComponent,
    EditUnitComponent,
    EditPaidLoanComponent,
    UnitReportComponent,
    PaidLoanReportComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengListModule,
    AngularMaterialListModule,
    NgPersianDatepickerModule,
    NgxPrintModule
  ],
  entryComponents: [
    UnitComponent,
    AdministratorAddComponent,
    AdministratorEditComponent,
    AdministratorDetailsComponent,
    AdministratorSecurityComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],

})
export class AdminModule { }
