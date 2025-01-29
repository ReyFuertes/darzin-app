import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';

import { IProduct } from '../products.model';
import { ProductsService } from '../products.service';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';
import { GenericPage } from '../../../shared/generics/page.generic';
import { DialogType } from '../../../models/app.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductsListComponent extends GenericPage implements OnInit {
  public products: IProduct[];

  constructor(private productService: ProductsService) {
    super();
    this.columns = ['id', 'name', 'description', 'price', 'edit', 'delete'];
  }

  ngOnInit(): void {
    this.productService.getAll()
      .subscribe(products => this.products = products);
  }

  public onAdd() {
    const dialog = this.dialog.open(DialogComponent,
      { ...this.dialogConfig, data: { type: DialogType.product, title: 'Add Product' } });
    dialog.afterClosed().subscribe(({ values }) => {
      if (values) {
        this.productService.post(values)
          .pipe(switchMap(() => this.productService.getAll()))
          .subscribe(products => this.products = products)
      }
    });
  }

  public onDelete(item: any): void {
    this.productService.delete(`/${item?.id}`)
      .pipe(switchMap(() => this.productService.getAll()))
      .subscribe(products => this.products = products)
  }

  public onEdit(item: any): void {
    const dialog = this.dialog.open(DialogComponent,
      { ...this.dialogConfig, data: { type: DialogType.product, title: 'Edit Product', item } });
    dialog.afterClosed().subscribe(({ values }) => {
      if (values) {
        this.productService.patch([
          { op: "replace", path: "/name", value: values?.name },
          { op: "replace", path: "/description", value: values?.description },
          { op: "replace", path: "/price", value: values?.price },
        ], `/${values?.id}`)
          .pipe(switchMap(() => this.productService.getAll()))
          .subscribe(products => {
            this.products = products
          })
      }
    });
  }
}
