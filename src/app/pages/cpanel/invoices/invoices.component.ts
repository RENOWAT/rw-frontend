import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {BillingService} from '@services/billing.service';
import {Invoice} from '@classes/invoice';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit{

  monthlyBilling: any[];

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['year', 'month', 'amount', 'consumption', 'status', 'actions'];
  tableData: Invoice[] = [];
  resultsPerPage = 4;
  currentPageIndex = 0;

  subscriptions: any[];
  selectedSubscription: number;

  columns: Array<string> = [];
  columnsHeader: Array<string>;

  constructor(private billingService: BillingService) { }

  ngOnInit() {
    this.billingService.getSubscriptions().subscribe(subscriptions => {
      this.subscriptions = subscriptions;
      this.selectedSubscription = Math.min(...this.subscriptions.map(subscription => subscription.id));
      this.getInvoices(this.selectedSubscription);
    });
  }

  getInvoices(planId: number) {
    this.billingService.getInvoices(planId).subscribe((data: Invoice[]) => {
      this.monthlyBilling = data.map(({ amount, month, year }) => ({
        amount,
        monthyear: `${month}-${year}`
      }));
      data = data.sort((a: Invoice, b: Invoice) => {if (a.year !== b.year) {return b.year - a.year;} return b.month - a.month;});
      this.tableData = data;
      this.dataSource = new MatTableDataSource(data.slice(0,this.resultsPerPage));
    });
  }

  onSubscriptionChange(planId: number) {
    this.getInvoices(planId);
  }



  getResultsForPage(pageIndex: number): any[] {
    const start = pageIndex * this.resultsPerPage;
    const end = start + this.resultsPerPage;
    return this.tableData.slice(start, end);
  }

  previousPage() {
    if (this.hasPreviousPage()) {
      this.currentPageIndex--;
      this.dataSource.data = this.getResultsForPage(this.currentPageIndex);
    }
  }

  hasPreviousPage(): boolean {
    return this.currentPageIndex !== 0;
  }

  nextPage() {
    if (this.hasNextPage()) {
      this.currentPageIndex++;
      this.dataSource.data = this.getResultsForPage(this.currentPageIndex);
    }
  }

  hasNextPage(): boolean {
    return (this.currentPageIndex + 1) * this.resultsPerPage < this.tableData.length;
  }

  pdf(invoice: any): void {
    console.log(invoice.id);
  }

}
