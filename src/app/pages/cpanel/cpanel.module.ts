import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '@shared/shared.module';
import { CpanelRoutingModule } from './cpanel-routing.module';
import { ManagementComponent } from './management/management.component';
import { CrudComponent } from './management/crud/crud.component';
import { ReadDialogComponent } from './management/dialogs/read-dialog.component';


@NgModule({
  declarations: [
    ManagementComponent,
    CrudComponent,
    ReadDialogComponent
  ],
  imports: [
    CommonModule,
    CpanelRoutingModule,
    SharedModule
  ]
})
export class CpanelModule { }
