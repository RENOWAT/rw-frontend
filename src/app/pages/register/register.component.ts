import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomerRegister} from '@classes/customer-register';
import {ActivatedRoute, Router} from '@angular/router';
import {RegisterService} from '@services/register.service';
import {AlertService} from '@services/core/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  registrationForm: FormGroup;
  customerRegister: CustomerRegister;
  registerFinished = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute,
              private registerService: RegisterService, private alertService: AlertService) { }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      familyName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.minLength(9)]],
      dni: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    });
  }

  register() {
    this.customerRegister= new CustomerRegister();
    Object.assign(this.customerRegister, this.registrationForm.value);

    const data = {
      userDto: this.customerRegister,
      selectedPlan: this.registerService.selectedImageId
    };

    this.registerService.registerUser(data)
      .subscribe({
        next: () => {
          this.registerFinished = true;
        },
        error: err => {
          this.alertService.error(err.message);
        }
      });
  }

  login() {
    this.router.navigate(['/home']);
  }

}
