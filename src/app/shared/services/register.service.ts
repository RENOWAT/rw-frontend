import { Injectable } from '@angular/core';
import {environment} from '@env';
import {Observable} from 'rxjs';
import {CustomerRegister} from '@classes/customer-register';
import {HttpService} from '@services/core/http.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  static END_POINT_REGISTER = environment.REST_BACKEND + '/customers/create';
  selectedImageId: number;

  constructor(private httpService: HttpService) { }

  updateSelectedImageId(imageId: number) {
    this.selectedImageId = imageId;
  }

  registerUser(customerRegister: any): Observable<any> {
    return this.httpService
      .post(RegisterService.END_POINT_REGISTER, customerRegister);
  }

}
