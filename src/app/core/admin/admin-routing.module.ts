import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UnitComponent } from './unit/unit.component';
import { PaymentComponent } from './payment/payment.component';
import { AdministratorsComponent } from './administrators/administrators.component';
import { ReportComponent } from './report/report.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from 'src/app/auth/auth-guard';

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
    canActivate: [AuthGuard]
  },
  {
    path: 'panel',
    component: AdminComponent,
    children: [
      {
        path: 'payment',
        component: PaymentComponent,
      },
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'panel',
    component: AdminComponent,
    children: [
      {
        path: 'report',
        component: ReportComponent,
      },
    ],
    canActivate: [AuthGuard]
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
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
