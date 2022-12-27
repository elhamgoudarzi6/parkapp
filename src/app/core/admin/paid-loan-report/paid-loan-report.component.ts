import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-paid-loan-report',
  templateUrl: './paid-loan-report.component.html',
  styleUrls: ['./paid-loan-report.component.scss'],
  providers: [MessageService]

})
export class PaidLoanReportComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

