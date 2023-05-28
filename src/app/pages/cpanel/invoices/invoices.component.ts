import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {BillingService} from '@services/billing.service';
import {Invoice} from '@classes/invoice';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit{

  private chart: Chart;
  monthlyBilling: any[];
  currentMonthIndex: number = 0;

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
      this.createChart();
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

  createChart(){
    this.currentMonthIndex = this.monthlyBilling.length -12;
    const labels = this.monthlyBilling.slice(-12).map(d => d.monthyear);
    const values = this.monthlyBilling.slice(-12).map(d => d.amount);
    if(this.chart){this.chart.destroy();}
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Importe',
          data: values,
          backgroundColor: '#3e95cd',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        title: {
          display: true,
          text: 'Mis facturas'
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
      },
    });
  }

  prevMonth(): void {
    if (this.currentMonthIndex > 0) {
      this.currentMonthIndex--;
      this.updateChart();
    }
  }

  nextMonth(): void {
    if (this.currentMonthIndex < this.monthlyBilling.length - 1) {
      this.currentMonthIndex++;
      this.updateChart();
    }
  }

  updateChart(): void {
    this.chart.data = {
      labels: this.monthlyBilling.slice(this.currentMonthIndex, this.currentMonthIndex + 12).map(d => d.monthyear),
      datasets: [{
        label: 'Importe',
        data: this.monthlyBilling.slice(this.currentMonthIndex, this.currentMonthIndex + 12).map(d => d.amount),
        backgroundColor: '#3e95cd'
      }]
    };
    this.chart.update();
  }

}
