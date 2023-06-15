import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {RegisterService} from '@services/register.service';

@Component({
  selector: 'app-retail',
  templateUrl: './retail.component.html',
  styleUrls: ['./retail.component.css']
})
export class RetailComponent {

  constructor(private router: Router, private registerService: RegisterService) {}


  images = [
    { id: 1, url: 'assets/planestable.png'},
    { id: 2, url: 'assets/planonline.png' },
  ];

  register(id: number) {
    this.registerService.updateSelectedImageId(id);
    this.router.navigate(['/home/register']);
  }

}
