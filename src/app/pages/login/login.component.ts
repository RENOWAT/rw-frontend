import {Component, OnInit} from '@angular/core';
import {Credentials} from '@classes/credentials';
import {SessionService} from '@services/core/session.service';
import {Router} from '@angular/router';
import {AlertService} from '@services/core/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {

  public credentials: Credentials;

  constructor(private sessionService: SessionService,
              private router: Router, private alertService: AlertService) {}

  ngOnInit() {
    this.credentials = new Credentials();
  }

  public login(): void {
    this.sessionService.validateCredentials(this.credentials.username,this.credentials.password)
      .subscribe({
        next: results => {
          this.handleLoginResult(results)
        },
        error: err => {
          this.alertService.error(err.message);
        }
      });
  }

  private handleLoginResult(results: any) {
    this.sessionService.createSession(results.token, results.name, results.email, results.role)
      .subscribe();
    this.router.navigate(['/home']);
  }

  isAuthenticated(): boolean {
    return this.sessionService.isAuthenticated();
  }

}
