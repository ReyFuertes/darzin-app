import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';

import { DialogComponent } from '../../../shared/components/dialog/dialog.component';
import { ICustomer } from '../customer.model';
import { CustomersService } from '../customer.service';
import { GenericPage } from '../../../shared/generics/page.generic';
import { DialogType } from '../../../models/app.model';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent extends GenericPage implements OnInit {
  public customers: ICustomer[];

  constructor(private customersService: CustomersService) {
    super();
    this.columns = ['id', 'name', 'purchases', 'edit', 'delete'];
    this.dialogConfig = { height: '225px', width: '400px' };
  }

  ngOnInit(): void {
    this.customersService.getAll()
      .subscribe(customers => this.customers = customers);
  }

  public onView(item: any): void {
    this.dialogConfig = { height: 'auto', width: '800px' };
    const dialog = this.dialog.open(DialogComponent,
      { ...this.dialogConfig, data: { type: DialogType.purchases, title: 'Purchases', item } });
    dialog.afterClosed().subscribe(result => {
      //note: perform add request api
    });
  }

  public onAdd() {
    this.dialogConfig = { height: '225px', width: '400px' };
    const dialog = this.dialog.open(DialogComponent,
      { ...this.dialogConfig, data: { type: DialogType.customer, title: 'Add Customer' } });
    dialog.afterClosed().subscribe(({ values }) => {
      if (values) {
        this.customersService.post(values)
          .pipe(switchMap(() => this.customersService.getAll()))
          .subscribe(customers => this.customers = customers);
      }
    });
  }

  public onEdit(item: any): void {
    this.dialogConfig = { height: '225px', width: '400px' };
    const dialog = this.dialog.open(DialogComponent,
      { ...this.dialogConfig, data: { type: DialogType.customer, title: 'Edit Customer', item } });
    dialog.afterClosed().subscribe(({ values }) => {
      if (values) {
        this.customersService.patch([{ op: "replace", path: "/name", value: values?.name }], `/${values?.id}`)
          .pipe(switchMap(() => this.customersService.getAll()))
          .subscribe(customers => this.customers = customers);
      }
    });
  }

  public onDelete(item: any): void {
    this.customersService.delete(`/${item?.id}`)
      .pipe(switchMap(() => this.customersService.getAll()))
      .subscribe(customers => this.customers = customers)
  }
}
