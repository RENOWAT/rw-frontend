import { Injectable } from '@angular/core';
import {environment} from '@env';
import {HttpService} from '@services/core/http.service';
import {Observable} from 'rxjs';
import {Subscription} from '@classes/subscription';

@Injectable({
  providedIn: 'root'
})
export class BillingService {

  static END_POINT_SUBSCRIPTION = environment.REST_BACKEND + '/subscription';
  static END_POINT_USER = environment.REST_BACKEND + '/users/search';
  static END_POINT_PLAN = environment.REST_BACKEND + '/plan';

  subscriptionData: Subscription;

  constructor(private httpService: HttpService) { }

  getSubscriptions(): Observable<Subscription[]> {
    return this.httpService.get(BillingService.END_POINT_SUBSCRIPTION);
  }

  getUser(): Observable<any[]> {
    return this.httpService.get(BillingService.END_POINT_USER);
  }

  createSubscription(subscription: Subscription): Observable<Subscription> {
    return this.httpService
      .post(BillingService.END_POINT_SUBSCRIPTION, subscription);
  }

  getPlans(): Observable<any[]> {
    return this.httpService.get(BillingService.END_POINT_PLAN);
  }

}
