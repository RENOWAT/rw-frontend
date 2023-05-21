import { Component } from '@angular/core';
import {SessionService} from "@services/core/session.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private sessionService: SessionService, private router: Router) {}

  isAuthenticated(): boolean {
    return this.sessionService.isAuthenticated();
  }
}
