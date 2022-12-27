import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UnitComponent } from './unit/unit.component';
import { PaidLoanComponent } from './paid-loan/paid-loan.component';
import { AdministratorsComponent } from './administrators/administrators.component';
import { UnitReportComponent } from './unit-report/unit-report.component';
import { PaidLoanReportComponent } from './paid-loan-report/paid-loan-report.component';
import { HomeComponent } from './home/home.component';
const routes: Routes = [
  {
    path: 'panel',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
    ],
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'panel',
    component: AdminComponent,
    children: [
      {
        path: 'unit',
        component: UnitComponent,
      },
    ],
  },
  {
    path: 'panel',
    component: AdminComponent,
    children: [
      {
        path: 'paidloan',
        component: PaidLoanComponent,
      },
    ],
  },
  {
    path: 'panel',
    component: AdminComponent,
    children: [
      {
        path: 'unit-report',
        component: UnitReportComponent,
      },
    ],
  },
  {
    path: 'panel',
    component: AdminComponent,
    children: [
      {
        path: 'paid-loan-report',
        component: PaidLoanReportComponent,
      },
    ],
  },
  {
    path: 'panel',
    component: AdminComponent,
    children: [
      {
        path: 'config',
        component: AdministratorsComponent,
      },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
