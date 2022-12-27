import { TokenService } from './../../../auth/token.service';
import { AddPaidLoanComponent } from './add-paid-loan/add-paid-loan.component';
import { ViewPaidLoanComponent } from './view-paid-loan/view-paid-loan.component';
import { LocalStorageService } from './../../../auth/local-storage.service';
import { AdminService } from './../admin.service';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import jsPDF from "jspdf";
import 'jspdf-autotable';
import { EditPaidLoanComponent } from './edit-paid-loan/edit-paid-loan.component';
@Component({
  selector: 'app-paid-loan',
  templateUrl: './paid-loan.component.html',
  styleUrls: ['./paid-loan.component.scss'],
  providers: [MessageService, ConfirmationService, DialogService]
})

export class PaidLoanComponent implements OnInit {
  paidLoans: any[] = [];
  selectedPaidLoans: any[] = [];
  cols: any[] | any;
  allCols: any[] | any;
  exportCols: any[] | any;
  exportColumns: any[] | any;
  constructor(
    private messageService: MessageService,
    private service: AdminService,
    private token: TokenService,
    private localStorage: LocalStorageService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.getPaidLoans();
    this.cols = [
      { field: 'ceoFullName', header: 'وام گیرنده', showSort: true },
      { field: 'companyName', header: 'شرکت', showSort: true },
      { field: 'amountPayable', header: 'مبلغ', showSort: true },
      { field: 'approvalType', header: 'نوع مصوبه', showSort: true },
      { field: 'meetingDate', header: 'تاریخ صورت جلسه', showSort: true },
      { field: 'meetingNumber', header: 'شماره صورت جلسه', showSort: true },
      { field: 'paymentDate', header: 'تاریخ پرداخت ', showSort: true },
    ];

    this.allCols = [
      { field: 'ceoFullName', header: 'وام گیرنده' },
      { field: 'guarantorsName', header: 'نام ضامنین' },
      { field: 'guarantorMobile', header: 'شماره ضامنین' },
      { field: 'amountPayable', header: 'مبلغ پرداختی ' },
      { field: 'approvalType', header: 'نوع مصوبه' },
      { field: 'meetingDate', header: 'تاریخ صورت جلسه' },
      { field: 'meetingNumber', header: 'شماره صورت جلسه' },
      { field: 'paymentDate', header: 'تاریخ پرداخت ' },
      { field: 'InstallmentNumber', header: 'تاریخ پرداخت ' },
      { field: 'breathingTime', header: 'مدت تنفس' },
      { field: 'paymentPlace', header: 'محل پرداخت' },
    ];

    this.exportCols = this.allCols.map((col: { header: any; field: any; }) => ({ title: col.header, dataKey: col.field }));
  }

  showAddPaidLoanDialog(): void {
    const ref = this.dialogService.open(AddPaidLoanComponent, {
      header: 'ثبت پرداختی جدید',
      width: '90%',
    });
    ref.onClose.subscribe((res) => {
      if (res === true) {
        this.messageService.add({
          severity: 'success',
          summary: ' ثبت اطلاعات ',
          detail: 'اطلاعات با موفقیت ثبت شد.',
        });
        this.getPaidLoans();
      }
    });
  }

  showPaidLoanDialog(id: string): void {
    let paidLoan = this.paidLoans.filter((x) => x.id == id)[0];
    const ref = this.dialogService.open(ViewPaidLoanComponent, {
      data: {
        paidLoan,
      },
      header: 'مشاهده اطلاعات نماینده',
      width: '90%',
    });
    ref.onClose.subscribe((res) => {
      if (res === true) {
        this.getPaidLoans();
      }
    });
  }


  getPaidLoans(): any {
    this.service.getAllPaidLoan(this.localStorage.userToken).subscribe((response: { success: boolean; data: any; }) => {
      if (response.success === true) {
        this.paidLoans = [];
        for (let i = 0; i < response.data.length; i++) {
          let a1 = response.data[i];
          let a2 = response.data[i].Unit[0];
          let merged = { ...a1, ...a2 };
          this.paidLoans.push(merged);
          delete this.paidLoans[i]._id;
          delete this.paidLoans[i].Unit;
        }
      } else {
        // this.token.checkTokenExamination(response.data, 'admin');
        this.messageService.add({
          severity: 'error',
          summary: ' دریافت اطلاعات ',
          detail: response.data,
        });
      }
    });
  }

  exportCSV() {
    let data = this.selectedPaidLoans.length === 0 ? this.paidLoans : this.selectedPaidLoans;
    const replacer = (_key: any, value: null) => value === null ? '' : value;
    const header = Object.keys(this.paidLoans[0]);
    let csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');
    var blob = new Blob([csvArray], { type: 'text/csv' })
    FileSaver.saveAs(blob, "paidLoans.csv");
  }

  exportPdf() {
    let data = this.selectedPaidLoans.length === 0 ? this.paidLoans : this.selectedPaidLoans;
    const doc = new jsPDF('p', 'mm', 'a4');
    doc.addFont('./../../../../assets/fonts/iran-sans/IRANSansWeb(FaNum)_Light.ttf', 'IRANSansWeb(FaNum)_Light', 'normal');
    doc.addFont('./../../../../assets/fonts/iran-sans/IRANSansWeb(FaNum).ttf', 'IRANSansWeb(FaNum)', 'normal');
    doc.setFont('IRANSansWeb(FaNum)');
    doc.text('گزارش تسهیلات پرداختی', 100, 8, { align: 'center' });
    (doc as any).autoTable(this.exportCols, data,
      {
        headStyles: { fontSize: 8, font: 'IRANSansWeb(FaNum)', textColor: "#fff", cellWidth: 'wrap', halign: 'center', minCellWidth: 10 },
        styles: { fontSize: 7, font: 'IRANSansWeb(FaNum)_Light', textColor: "#666", cellWidth: 'wrap', halign: 'center' },
        margin: { top: 15, left: 2, right: 2, bottom: 10 },
        tableWidth: 'wrap',
        overflow: 'visible'
      },
    );
    doc.save('paidLoans.pdf');
  }

  exportExcel() {
    let data = this.selectedPaidLoans.length === 0 ? this.paidLoans : this.selectedPaidLoans;
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(data);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "paidLoans");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }


  showEditPaidLoanDialog(id: string): void {
    let paidLoan = this.paidLoans.filter((x) => x.id == id)[0];
    const ref = this.dialogService.open(EditPaidLoanComponent, {
      data: {
        paidLoan,
      },
      header: 'ویرایش تسهیلات پرداختی',
      width: '80%',
    });
    ref.onClose.subscribe((res) => {
      if (res === true) {
        this.messageService.add({
          severity: 'success',
          summary: ' ویرایش اطلاعات ',
          detail: 'اطلاعات با موفقیت ویرایش شد.',
        });
        this.getPaidLoans();
      }
    });
  }

  deletePaidLoan(id: any): void {
    this.confirmationService.confirm({
      message: 'آیا از حذف رکورد انتخابی مطمئن هستید؟',
      header: '',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        this.service.deletePaidLoan(this.localStorage.userToken, id).subscribe((response: { success: boolean; data: any; }) => {
          if (response.success === true) {
            this.confirmationService.close();
            this.messageService.add({
              severity: 'success',
              summary: ' حذف اطلاعات ',
              detail: response.data,
            });
            this.getPaidLoans();
          } else {
            this.messageService.add({
              severity: 'error',
              summary: ' حذف اطلاعات ',
              detail: response.data,
            });
          }
        });
      },
      reject: () => {
        this.confirmationService.close();
      },
    });
  }

}