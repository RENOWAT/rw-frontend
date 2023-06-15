import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {of} from 'rxjs';
import {ReadDialogComponent} from './dialogs/read-dialog.component';
import {BillingService} from '@services/billing.service';
import {CreationDialogComponent} from './dialogs/creation-dialog.component';


@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit{

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['firstName', 'familyName', 'dni', 'mobile', 'email', 'address', 'registrationDate'];
  contracts = of([]);

  constructor(private dialog: MatDialog, private billingService: BillingService) { }

  ngOnInit() {
    this.contracts =  this.billingService.getSubscriptions();
    this.billingService.getUser().subscribe((data: any[]) => {
      this.dataSource = new MatTableDataSource([data]);
    });
  }

  read(subscription: any): void {
    this.dialog.open(ReadDialogComponent, {
      data: {
        title: 'Detalle del contrato',
        object: of(subscription)
      }
    });
  }

  convertToDate(dateString: string): Date {
    return new Date(dateString);
  }

  create(): void {
    const dialogRef = this.dialog.open(CreationDialogComponent, {
      data: {
        title: 'Da de alta tu contrato',
        object: this.billingService.getPlans()
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.contracts =  this.billingService.getSubscriptions();
    });
  }


}
