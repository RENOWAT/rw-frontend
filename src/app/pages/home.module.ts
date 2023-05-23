import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '@shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { AboutComponent } from './about/about.component';
import { AlertComponent } from './alert/alert.component';
import { ContactComponent } from './contact/contact.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RetailComponent } from './retail/retail.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    AlertComponent,
    ContactComponent,
    NavbarComponent,
    RetailComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [

  ]
})
export class HomeModule { }
