import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home.component';
import {AboutComponent} from "./about/about.component";
import {RetailComponent} from './retail/retail.component';
import {ContactComponent} from './contact/contact.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [

  {
    path: '', component: HomeComponent,
    children: [
      {path: '', component: RetailComponent},
      {path: 'about', component: AboutComponent},
      {path: 'contact', component: ContactComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'login', component: LoginComponent},
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
