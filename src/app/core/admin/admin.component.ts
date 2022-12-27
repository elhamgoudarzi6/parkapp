import { AdminService } from './admin.service';
import { LocalStorageService } from './../../auth/local-storage.service';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import * as moment from 'jalali-moment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  items: MenuItem[] | any;
  fullName: any;
  image: any;
  access: any[] | any;
  public date = moment(Date.now()).locale('fa').format('YYYY/M/D');
  public time: any;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private localStorage: LocalStorageService,
    private router: Router,
    private service: AdminService
  ) { }

  ngOnInit(): void {

    if (!this.localStorage.getCurrentUser() || this.localStorage.userType != 'admin') {
      this.router.navigateByUrl('/login');
    } else {
      this.service.getToken(this.localStorage.userID).subscribe((result: { success: boolean; }) => {
        if (result.success === false) {
          this.localStorage.removeCurrentUser();
          this.router.navigateByUrl('/login');
        }
        this.createMenu();
      });
    }
    this.fullName = this.localStorage.userFullName;
    this.image = this.localStorage.userImage;
    this.access = this.localStorage.accessLevel;

    this.createMenu();

    setInterval(() => {
      this.time = moment(Date.now()).locale('fa').format('HH:mm');
    }, 1000);





  }

  createMenu() {
    let menu: MenuItem[] = [];
    this.access.forEach((result: any) => {
      if (result.title === 'صفحه اصلی') menu.push({
        label: 'صفحه اصلی',
        icon: 'pi pi-home',
        routerLink: '/panel',
      })
      if (result.title === 'واحد فناور') menu.push({
        label: 'واحد فناور',
        icon: 'pi pi-briefcase',
        routerLink: '/panel/unit',
      })
      if (result.title === 'تسهیلات') menu.push({
        label: 'تسهیلات',
        icon: 'pi pi-dollar',
        routerLink: '/panel/paidloan',
      })
      if (result.title === 'گزارش واحد فناور') menu.push({
        label: 'گزارش واحد فناور',
        icon: 'pi pi-file-pdf',
        routerLink: '/panel/unit-report',
      })
      if (result.title === 'گزارش تسهیلات') menu.push({
        label: 'گزارش تسهیلات',
        icon: 'pi pi-file-pdf',
        routerLink: '/panel/paid-loan-report',
      })
      if (result.title === 'تنظیمات') menu.push({
        label: 'تنظیمات',
        icon: 'pi pi-cog',
        routerLink: '/panel/config',
      })
      this.items = menu;
    });
    // this.items = [
    //   {
    //     label: 'صفحه اصلی',
    //     icon: 'pi pi-home',
    //     routerLink: '/panel',
    //   },
    //   {
    //     label: 'واحد فناور',
    //     icon: 'pi pi-briefcase',
    //     routerLink: '/panel/unit',
    //   },
    //   {
    //     label: 'تسهیلات',
    //     icon: 'pi pi-dollar',
    //     routerLink: '/panel/paidloan',
    //   },

    //   {
    //     label: 'گزارش واحد فناور',
    //     icon: 'pi pi-file-pdf',
    //     routerLink: '/panel/unit-report',
    //   },
    //   {
    //     label: 'گزارش تسهیلات',
    //     icon: 'pi pi-file-pdf',
    //     routerLink: '/panel/paid-loan-report',
    //   },
    //   {
    //     label: 'تنظیمات',
    //     icon: 'pi pi-cog',
    //     routerLink: '/panel/config',
    //   },
    // ];
  }

  logOut(): void {
    this.localStorage.removeCurrentUser();
    this.router.navigateByUrl('/');
  }

}
