import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs';

import { DialogType, IFormInfo } from '../../../models/app.model';
import { GenericDestroy } from '../../../shared/generics/destroy.generic';
import { ICustomerPurchase } from '../customer.model';
import { ProductsService } from '../../products/products.service';
import { IProduct } from '../../products/products.model';

@Component({
  selector: 'app-customer-purchase',
  templateUrl: './customer-purchase.component.html',
  styleUrls: ['./customer-purchase.component.scss']
})
export class CustomerPurchaseComponent extends GenericDestroy implements OnInit {
  @Input() public data: ICustomerPurchase;
  @Output() public formEmitter = new EventEmitter<IFormInfo>();

  public form: FormGroup;
  public products: IProduct[];

  constructor(private fb: FormBuilder, private productService: ProductsService) {
    super();
    this.productService.getAll()
      .subscribe(products => this.products = products);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: new FormControl(undefined),
      productId: new FormControl(undefined, Validators.required)
    });
    this.form.valueChanges
      .pipe(takeUntil(this.$unsubscribe))
      .subscribe(() => this.formEmitter.emit({
        type: DialogType.purchase,
        valid: this.form.valid, values: this.form.value
      }));
  }
}
