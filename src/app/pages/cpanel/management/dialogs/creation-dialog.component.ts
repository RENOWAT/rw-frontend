import {Component, Inject} from '@angular/core';
import {Subscription} from '@classes/subscription';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {BillingService} from '@services/billing.service';
import {MatSelectChange} from '@angular/material/select';

@Component({
  selector: 'app-creation-dialog',
  templateUrl: './creation-dialog.component.html',
  styleUrls: ['./creation-dialog.component.css']
})
export class CreationDialogComponent {
  title: string;
  subscription:  Subscription;
  selectedPlan: string;
  planNames: string[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) data: any, private billingService: BillingService,
              private dialog: MatDialog) {
    this.title = data.title;
    data.object.subscribe((array) => {
      this.planNames = array.map((object) => object.name);
    });
    this.subscription = {
      planName: undefined, address: undefined, productName: "Electricidad", tariff: "BT 2.0 TD", cups: undefined
    };
  }

  create(): void {
    this.billingService
      .createSubscription(this.subscription)
      .subscribe(() => this.dialog.closeAll());
  }

  setPlan(event: MatSelectChange) {
    this.subscription.planName = event.value;
  }

  invalid(): boolean {
    return this.check(this.subscription.planName) || this.check(this.subscription.productName)
      || this.check(this.subscription.tariff) || this.check(this.subscription.address) || this.check(this.subscription.cups);
  }

  check(attr: string): boolean {
    return attr === undefined || null || attr === '';
  }


}
