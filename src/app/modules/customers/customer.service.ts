import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BaseService } from "../../services/base.service";
import { ICustomer, ICustomerPurchase } from "./customer.model";

@Injectable()
export class CustomerPurchaseService extends BaseService<ICustomerPurchase> {
  constructor(http: HttpClient) {
    super(http, 'purchase');
  }
}
@Injectable()
export class CustomersService extends BaseService<ICustomer> {
  constructor(http: HttpClient) {
    super(http, 'customer');
  }
}