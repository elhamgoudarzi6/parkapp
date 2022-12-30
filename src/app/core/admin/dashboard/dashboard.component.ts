import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from './../../../auth/local-storage.service';
import { AdminService } from './../admin.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  data: any;
  data2: any;
  unitCount: any;
  paidLoanCount: any;
  chartOptions: any;
  constructor(
    private service: AdminService,
    private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    this.service.getAllUnit(this.localStorage.userToken).subscribe((response: { success: boolean; data: any; }) => {
      let c1 = 0;
      let c2 = 0;
      if (response.success === true) {
        this.unitCount = response.data.length;
        for (let i = 0; i < this.unitCount; i++) {
          if (response.data[i].unitType === 'هسته') {
            c1 += 1;
          } else {
            c2 += 1;
          }
        }
        this.data = {
          labels: ['هسته', 'شرکت', 'همه'],
          datasets: [
            {
              data: [c1, c2, this.unitCount],
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
              ],
              hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
              ]
            }
          ]
        }
      } else {
        // this.token.checkTokenExamination(response.data, 'admin');
      }
    });

    this.service.getAllPaidLoan(this.localStorage.userToken).subscribe((response: { success: boolean; data: any; }) => {
      let c1 = 0;
      let c2 = 0;
      if (response.success === true) {
        this.paidLoanCount = response.data.length;
        for (let i = 0; i < this.paidLoanCount; i++) {
          if (response.data[i].Unit[0].unitType === 'هسته') {
            c1 += 1;
          } else {
            c2 += 1;
          }
        }
        this.data2 = {
          labels: ['هسته', 'شرکت', 'همه'],
          datasets: [
            {
              data: [c1, c2, this.paidLoanCount],
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
              ],
              hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
              ]
            }
          ]
        }
      } else {
        // this.token.checkTokenExamination(response.data, 'admin');
      }
    });
  }
}
