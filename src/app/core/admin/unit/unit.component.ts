import { TokenService } from './../../../auth/token.service';
import { AddUnitComponent } from './add-unit/add-unit.component';
import { EditUnitComponent } from './edit-unit/edit-unit.component';
import { LocalStorageService } from './../../../auth/local-storage.service';
import { ViewUnitComponent } from './view-unit/view-unit.component';
import { AdminService } from './../admin.service';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import jsPDF from "jspdf";
import 'jspdf-autotable';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss'],
  providers: [MessageService, ConfirmationService, DialogService]
})

export class UnitComponent implements OnInit {
  units: any[] = [];
  selectedUnits: any[] = [];
  cols: any[] | any;
  allCols: any[] | any;
  exportCols: any[] | any;
  exportHeaders: any;
  constructor(
    private messageService: MessageService,
    private service: AdminService,
    private token: TokenService,
    private localStorage: LocalStorageService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService
  ) { }
  ngOnInit(): void {
    this.getUnits();
    this.cols = [
      { field: 'unitType', header: 'نوع', customExportHeader: 'نوع واحد فناور', showSort: true },
      { field: 'ceoFullName', header: 'مدیرعامل/نماینده', customExportHeader: 'مدیرعامل / نماینده', showSort: true },
      { field: 'ceoID', header: 'کد ملی ', customExportHeader: 'کد ملی', showSort: true },
      { field: 'ceoMobile', header: 'شماره همراه', customExportHeader: 'شماره همراه', showSort: false },
      { field: 'companyName', header: 'نام شرکت', customExportHeader: 'نام شرکت', showSort: true },
      { field: 'companyID', header: 'شناسه ملی شرکت', customExportHeader: 'شناسه ملی شرکت', showSort: false },
    ];

    this.allCols = [
      { field: 'mem', header: 'اعضا تیم' },
      { field: 'ideas', header: 'ایده محوری' },
      { field: 'ceoPhone', header: 'تلفن ثابت' },
      { field: 'ceoMobile', header: 'شماره همراه' },
      { field: 'ceoID', header: 'کد ملی' },
      { field: 'ceoFullName', header: 'مدیرعامل/نماینده' },
      { field: 'companyID', header: 'شناسه ملی شرکت' },
      { field: 'companyName', header: 'نام شرکت' },
      { field: 'unitType', header: 'واحد فناور' },
    ];

    this.exportCols = this.allCols.map((col: { header: any; field: any; }) => ({ title: col.header, dataKey: col.field }));
  }

  showAddUnitDialog(): void {
    const ref = this.dialogService.open(AddUnitComponent, {
      header: 'ثبت واحد فناور',
      width: '90%',
      style: {"font-family": "IRANSans_Light"},
    });
    ref.onClose.subscribe((res) => {
      if (res === true) {
        this.messageService.add({
          severity: 'success',
          summary: ' ثبت اطلاعات ',
          detail: 'اطلاعات با موفقیت ثبت شد.',
        });
        this.getUnits();
      }
    });
  }

  getUnits(): any {
    this.service.getAllUnit(this.localStorage.userToken).subscribe((response: { success: boolean; data: any; }) => {
      if (response.success === true) {
        this.units = response.data;
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
    let data = this.selectedUnits.length === 0 ? this.units : this.selectedUnits;
    const replacer = (_key: any, value: null) => value === null ? '' : value;
    const header = Object.keys(this.units[0]);
    let csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');
    var blob = new Blob([csvArray], { type: 'text/csv' })
    FileSaver.saveAs(blob, "units.csv");
  }

  exportPdf() {
    let data = this.selectedUnits.length === 0 ? this.units : this.selectedUnits;
    const doc = new jsPDF('p', 'mm', 'a4');
    doc.addFont('./../../../../assets/fonts/iran-sans/IRANSansWeb(FaNum)_Light.ttf', 'IRANSansWeb(FaNum)_Light', 'normal');
    doc.addFont('./../../../../assets/fonts/iran-sans/IRANSansWeb(FaNum).ttf', 'IRANSansWeb(FaNum)', 'normal');
    doc.setFont('IRANSansWeb(FaNum)');
    doc.text('گزارش  واحد های فناور', 100, 8, { align: 'center' });
    (doc as any).autoTable(this.exportCols, data,
      {
        headStyles: { fontSize: 8, font: 'IRANSansWeb(FaNum)', textColor: "#fff", cellWidth: 'wrap', halign: 'center', minCellWidth: 10 },
        styles: { fontSize: 7, font: 'IRANSansWeb(FaNum)_Light', textColor: "#666", cellWidth: 'wrap', halign: 'center' },
        margin: { top: 15, left: 2, right: 2, bottom: 10 },
        tableWidth: 'wrap',
        overflow: 'visible'
      },
    );
    doc.save('units.pdf');
  }

  exportExcel() {
    let data = this.selectedUnits.length === 0 ? this.units : this.selectedUnits;
    import("xlsx").then(xlsx => {
      const Heading = [['شناسه', 'واحد فناور', 'نام شرکت', 'مدیرعامل/نماینده', 'شماره همراه', 'تلفن ثابت', 'کد ملی', 'تاریخ پذیرش', 'شناسه ملی شرکت', 'اعضا']];
      const worksheet = xlsx.utils.book_new();
      xlsx.utils.sheet_add_json(worksheet, data, { origin: 'A2', skipHeader: true });
      xlsx.utils.sheet_add_aoa(worksheet, Heading, { origin: 'A1' });
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "Results");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  showUnitDialog(id: string): void {
    let unit = this.units.filter((x) => x._id == id)[0];
    const ref = this.dialogService.open(ViewUnitComponent, {
      data: {
        unit,
      },
      header: 'مشاهده اطلاعات واحد فناور',
      width: '90%',
      style: {"font-family": "IRANSans_Light"},
    });
    ref.onClose.subscribe((res) => {
      if (res === true) {
        this.getUnits();
      }
    });
  }

  showEditUnitDialog(id: string): void {
    let unit = this.units.filter((x) => x._id == id)[0];
    const ref = this.dialogService.open(EditUnitComponent, {
      data: {
        unit,
      },
      header: 'ویرایش واحد فناور',
      width: '90%',
      style: {"font-family": "IRANSans_Light"},
    });
    ref.onClose.subscribe((res) => {
      if (res === true) {
        this.messageService.add({
          severity: 'success',
          summary: ' ویرایش اطلاعات ',
          detail: 'اطلاعات با موفقیت ویرایش شد.',
        });
        this.getUnits();
      }
    });
  }

  deleteUnit(id: any): void {
    this.confirmationService.confirm({
      message: 'آیا از حذف رکورد انتخابی مطمئن هستید؟',
      header: '',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        this.service.deleteUnit(this.localStorage.userToken, id).subscribe((response: { success: boolean; data: any; }) => {
          if (response.success === true) {
            this.confirmationService.close();
            this.messageService.add({
              severity: 'success',
              summary: ' حذف اطلاعات ',
              detail: response.data,
            });
            this.getUnits();
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
