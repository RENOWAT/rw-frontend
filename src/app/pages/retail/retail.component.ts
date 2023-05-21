import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-retail',
  templateUrl: './retail.component.html',
  styleUrls: ['./retail.component.css']
})
export class RetailComponent {

  constructor(private router: Router) {}

  images = [
    { id: 1, url: 'https://source.unsplash.com/user/c_v_r' },
    { id: 2, url: 'https://source.unsplash.com/user/c_v_r' },
  ];

}
