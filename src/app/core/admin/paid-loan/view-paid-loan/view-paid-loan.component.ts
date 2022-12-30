import { AdminService } from './../../admin.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LocalStorageService } from './../../../../auth/local-storage.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-view-paid-loan',
  templateUrl: './view-paid-loan.component.html',
  styleUrls: ['./view-paid-loan.component.scss']
})
export class ViewPaidLoanComponent implements OnInit {
  @ViewChild('epltable', { static: false }) epltable: ElementRef | any;

  paidLoan: any;

  constructor(
    private messageService: MessageService,
    private localStorage: LocalStorageService,
    private confirmationService: ConfirmationService,
    private service: AdminService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) { }

  ngOnInit(): void {
    this.paidLoan = this.config.data.paidLoan;
    console.log(this.paidLoan )
  }

}
