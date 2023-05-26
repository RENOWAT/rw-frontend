import { Injectable } from '@angular/core';
import {environment} from '@env';
import {Session} from '@classes/core/session';
import {HttpService} from '@services/core/http.service';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {map, Observable} from 'rxjs';
import {Role} from '@classes/enums/role.model';
import {CONFIG} from '../../../config';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  static END_POINT = environment.REST_BACKEND + '/users/token';
  private session: Session;

  constructor(private httpService: HttpService, private router: Router) {
    this.session = this.getLocalSession();
  }

  public getsession(): Session {
    return this.session;
  }

  validateCredentials(username: string, password: string): Observable<any> {
    return this.httpService.authBasic(username, password)
      .post(SessionService.END_POINT)
      .pipe(
        map(jsonToken => {
          const jwtHelper = new JwtHelperService();
          return {
            token: jsonToken.token,
            name: jwtHelper.decodeToken(jsonToken.token).name,
            role: jwtHelper.decodeToken(jsonToken.token).role
          }
        })
      );
  }

  logout(): void {
    this.destroySession();
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    return this.session != null && !(new JwtHelperService().isTokenExpired(this.session.token));
  }

  hasRoles(roles: Role[]): boolean {
    return this.isAuthenticated() && roles.includes(this.session.role);
  }

  isAdmin(): boolean {
    return this.hasRoles([Role.ADMIN]);
  }

  untilManager(): boolean {
    return this.hasRoles([Role.ADMIN, Role.MANAGER]);
  }

  untilOperator(): boolean {
    return this.hasRoles([Role.ADMIN, Role.MANAGER, Role.OPERATOR]);
  }

  isCustomer(): boolean {
    return this.hasRoles([Role.CUSTOMER]);
  }

  getMobile(): number {
    return this.session ? this.session.mobile : undefined;
  }

  getName(): string {
    return this.session ? this.session.name : '???';
  }

  getToken(): string {
    return this.session ? this.session.token : undefined;
  }

  public createSession(token: string, name: string, email: string, role: Role): Observable<any> {

    return new Observable(observer => {
      this.destroySession();
      this.session = {
        token: token,
        name: name,
        role: role
      };

      localStorage.setItem(`${CONFIG.STORAGE.SESSION}`, JSON.stringify(this.session));
      observer.complete();
    });
  }

  private getLocalSession() {
    return JSON.parse(localStorage.getItem(`${CONFIG.STORAGE.SESSION}`));
  }

  public destroySession() {
    this.session = null;
    localStorage.removeItem(`${CONFIG.STORAGE.SESSION}`);
  }




}
