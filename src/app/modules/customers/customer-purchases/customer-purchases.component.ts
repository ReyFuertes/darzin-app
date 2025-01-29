import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { switchMap } from 'rxjs';

import { GenericPage } from '../../../shared/generics/page.generic';
import { CustomerPurchaseService } from '../customer.service';
import { ICustomerPurchase } from '../customer.model';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';
import { DialogType, IFormInfo } from '../../../models/app.model';

@Component({
  selector: 'app-customer-purchases',
  templateUrl: './customer-purchases.component.html',
  styleUrls: ['./customer-purchases.component.scss']
})
export class CustomerPurchasesComponent extends GenericPage implements OnInit {
  @Input() public data: any;
  @Output() public formEmitter = new EventEmitter<IFormInfo>();

  public customersPurchases: ICustomerPurchase[];
  private serviceUrl: string = '';

  constructor(private customerPurchaseService: CustomerPurchaseService) {
    super();
    this.columns = ['customer', 'product', 'delete'];
  }

  ngOnInit(): void {
    this.serviceUrl = `/customer/${this.data?.item?.id}`;
    this.customerPurchaseService.getAll(this.serviceUrl)
      .subscribe(customersPurchases => this.customersPurchases = this.formatToTable(customersPurchases));
  }

  public onAdd(): void {
    this.dialogConfig = { height: '225px', width: '500px' };
    const dialog = this.dialog.open(DialogComponent,
      { ...this.dialogConfig, data: { type: DialogType.purchase, title: 'Add Purchase', item: this.data?.item } });
    dialog.afterClosed().subscribe(({ values }) => {
      if (values) {
        this.customerPurchaseService.post(Object.assign({}, values, {
          customerId: this.data?.item?.id
        })).pipe(switchMap(() => this.customerPurchaseService.getAll(this.serviceUrl)))
          .subscribe(customersPurchases => this.customersPurchases = this.formatToTable(customersPurchases));
      }
    });
  }

  public onDelete(item: any): void {
    this.customerPurchaseService.delete(`/${item?.id}`)
      .pipe(switchMap(() => this.customerPurchaseService.getAll(this.serviceUrl)))
      .subscribe(customersPurchases => this.customersPurchases = this.formatToTable(customersPurchases));
  }
  private formatToTable(customersPurchases: ICustomerPurchase[]): any {
    return customersPurchases?.map(purchase => ({
      id: purchase?.id,
      customer: purchase?.customer?.name,
      product: purchase?.product?.name
    }))
  }
}
