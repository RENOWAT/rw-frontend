import { Injectable } from '@angular/core';
import {environment} from '@env';
import {HttpService} from '@services/core/http.service';
import {Observable} from 'rxjs';
import {Subscription} from '@classes/subscription';
import {Invoice} from '@classes/invoice';

@Injectable({
  providedIn: 'root'
})
export class BillingService {

  static END_POINT_SUBSCRIPTION = environment.REST_BACKEND + '/subscription';
  static END_POINT_USER = environment.REST_BACKEND + '/users/search';
  static END_POINT_PLAN = environment.REST_BACKEND + '/plan';
  static END_POINT_INVOICE = environment.REST_BACKEND + '/invoice';

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

  getInvoices(Id: number): Observable<Invoice[]> {
    const params = { id: Id.toString() };
    return this.httpService
      .paramsFrom(params)
      .get(BillingService.END_POINT_INVOICE);
  }

  getInvoicePdf(id: string): Observable<ArrayBuffer> {
    const url = `${BillingService.END_POINT_INVOICE}/${id}`;
    return this.httpService
      .getPdf(url);
  }

}
