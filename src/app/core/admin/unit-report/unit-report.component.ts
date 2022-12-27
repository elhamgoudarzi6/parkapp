import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AdminService } from './../admin.service';
import { LocalStorageService } from './../../../auth/local-storage.service';
import { FormControl } from '@angular/forms';
import { IDatepickerTheme } from 'ng-persian-datepicker';
import * as moment from 'jalali-moment';
import * as FileSaver from 'file-saver';
import jsPDF from "jspdf";
import 'jspdf-autotable';
@Component({
  selector: 'app-unit-report',
  templateUrl: './unit-report.component.html',
  styleUrls: ['./unit-report.component.scss'],
  providers: [MessageService]

})
export class UnitReportComponent implements OnInit {
  selectedUnits: any[] = [];
  dateObject: any;
  unitTypes: any[] | any;
  filteredUnits: any[] = [];
  results: any[] = [];
  cols: any[] | any;
  admissionDateMin: string | any;
  data: any = {};
  field: string = '';
  dateValueMin = new FormControl();
  dateValueMax = new FormControl();
  selectedCol: any[] = [];
  exportCols: any[] | any;
  exportHeader: any[] = [];
  customTheme: Partial<IDatepickerTheme> = {
    selectedBackground: '#D68E3A',
    selectedText: '#FFFFFF',
  };

  constructor(
    private messageService: MessageService,
    private localStorage: LocalStorageService,
    private service: AdminService,
  ) { }

  ngOnInit(): void {
    this.advanceSearchUnit(this.data);
    
    this.cols = [
      { field: 'unitType', header: 'نوع', showSort: true },
      { field: 'ceoFullName', header: 'مدیرعامل/نماینده', showSort: true },
      { field: 'ceoID', header: 'کد ملی ', showSort: true },
      { field: 'ceoMobile', header: 'شماره همراه', showSort: false },
      { field: 'companyName', header: 'نام شرکت', showSort: true },
      { field: 'companyID', header: 'شناسه ملی شرکت', showSort: false },
      { field: 'ceoPhone', header: 'تلفن ثابت', showSort: false },
      { field: 'admissionDate', header: 'تاریخ پذیرش', showSort: false },
      { field: 'ideas', header: 'ایده محوری', showSort: false },
      { field: 'members', header: 'اعضا', showSort: false,sub:true },
    ];

    this.exportCols = this.selectedCol.map((col: { header: any; field: any; }) => ({ title: col.header, dataKey: col.field }));
    this.unitTypes = [{ title: 'هسته' }, { title: 'شرکت' }];
  }

  onClickselectCol(field: string, header: string, e: any): void {
    if (e.checked === true) {
      this.field = this.field + " " + field;
      this.data.select = this.field;
      this.selectedCol.push({ field: field, header: header });
      this.advanceSearchUnit(this.data);
    } else {
      this.field = this.field.replace(field, "");
      this.data.select = this.field;
      this.selectedCol = this.selectedCol.filter(item => { return item.field !== field; });
      this.advanceSearchUnit(this.data);
      // delete this.selectedCol[this.selectedCol.findIndex(item => item.field === col)]
    }
  }

  onSelectUnit(event: any) {
    this.data.unitType = event.title;
    this.advanceSearchUnit(this.data);

  }

  filterUnit(event: any) {
    this.filteredUnits = this.unitTypes.filter((item: any) => item.title.includes(event.query));
  }

  onSelectDateFrom(event: any) {
    this.data.admissionDateMin = event.shamsi;
    this.advanceSearchUnit(this.data);
  }

  onSelectDateTo(event: any) {
    this.data.admissionDateMax = event.shamsi;
    this.advanceSearchUnit(this.data);
  }

  exportCSV() {
    let data = this.selectedUnits.length === 0 ? this.results : this.selectedUnits;
    const replacer = (_key: any, value: null) => value === null ? '' : value;
    const header = Object.keys(this.results[0]);
    let csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');
    var blob = new Blob([csvArray], { type: 'text/csv' })
    FileSaver.saveAs(blob, "units.csv");
  }

  exportPdf() {
    let data = this.selectedUnits.length === 0 ? this.results : this.selectedUnits;
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
    this.selectedCol.forEach((element: { header: any; }) => {
      this.exportHeader.push(element.header);
    });
    let data = this.selectedUnits.length === 0 ? this.results : this.selectedUnits;
    import("xlsx").then(xlsx => {
      const Heading = [this.exportHeader];
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


  advanceSearchUnit(data: any): any {
    this.service.advanceSearchUnit(this.localStorage.userToken, data).subscribe((response: { success: boolean; data: any; }) => {
      if (response.success === true) {
        // if (data.select.includes("mems") || data.select.includes("ideas")) {
        //   console.log(data.select.includes("ceoID"))
        // }
        // console.log(data)
        // this.results = response.data;
        this.results = [];
        let mem, ideas;
        let obj = { mem: "", ideas: "" };
        for (let i in response.data) {
          delete response.data[i].__v;
          obj = response.data[i];
          mem = '';
          ideas = '';
          for (let j in response.data[i].members) {
            mem = mem + " " + response.data[i].members[j].fullName + "(" + response.data[i].members[j].mobile + ") -";
          }
          for (let j in response.data[i].idea) {
            ideas = ideas + response.data[i].idea[j].title + "(" + response.data[i].idea[j].dateIn + ") -";
          }
          obj.mem = mem;
          obj.ideas = ideas;
          this.results.push(obj);
        }
      } else {
        this.messageService.add({
          severity: 'error',
          summary: ' دریافت اطلاعات ',
          detail: response.data,
        });
      }
    });
  }

}
