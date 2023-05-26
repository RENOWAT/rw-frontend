import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {of} from 'rxjs';
import {ReadDialogComponent} from './dialogs/read-dialog.component';
import {BillingService} from '@services/billing.service';


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

}
