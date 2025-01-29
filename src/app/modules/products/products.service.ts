import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BaseService } from "../../services/base.service";

@Injectable()
export class ProductsService extends BaseService<any> {
  constructor(http: HttpClient) {
    super(http, 'Product');
  }
}