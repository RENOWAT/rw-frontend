import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '@shared/shared.module';
import {FormsModule} from "@angular/forms";
import { CpanelRoutingModule } from './cpanel-routing.module';
import { ManagementComponent } from './management/management.component';
import { CrudComponent } from './management/crud/crud.component';
import { ReadDialogComponent } from './management/dialogs/read-dialog.component';
import { CreationDialogComponent } from './management/dialogs/creation-dialog.component';
import { InvoicesComponent } from './invoices/invoices.component';


@NgModule({
  declarations: [
    ManagementComponent,
    CrudComponent,
    ReadDialogComponent,
    CreationDialogComponent,
    InvoicesComponent,
  ],
  imports: [
    CommonModule,
    CpanelRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class CpanelModule { }
