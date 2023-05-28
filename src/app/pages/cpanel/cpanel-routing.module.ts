import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CpanelComponent} from './cpanel.component';
import {Role} from '@classes/enums/role.model';
import {ManagementComponent} from './management/management.component';
import {AuthGuardService} from '@services/core/auth-guard.service';
import {InvoicesComponent} from './invoices/invoices.component';

const routes: Routes = [

  {
    path: '', component: CpanelComponent,
    canActivate: [AuthGuardService],
    data: {roles: [Role.CUSTOMER]},
    children: [
      {path: '', component: InvoicesComponent,
        canActivate: [AuthGuardService],
        data: {roles: [Role.CUSTOMER]}},
      {path: 'management', component: ManagementComponent,
        canActivate: [AuthGuardService],
        data: {roles: [Role.CUSTOMER]}},
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CpanelRoutingModule { }
