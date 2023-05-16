import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {SessionService} from '@services/core/session.service';
import {HttpService} from '@services/core/http.service';
import {AuthGuardService} from '@services/core/auth-guard.service';
import {TokenInterceptor} from '@core/tokeninterceptor';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    SessionService,
    HttpService,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
})
export class CoreModule {
}
