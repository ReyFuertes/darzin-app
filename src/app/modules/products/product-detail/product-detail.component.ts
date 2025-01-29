import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { IProduct } from '../products.model';
import { DialogType } from '../../../models/app.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnChanges {
  @Input() public data: IProduct;
  @Output() public formEmitter = new EventEmitter<{ type: DialogType, valid: boolean, values: any }>();

  public $unsubscribe = new Subject<void>();
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: new FormControl(0),
      name: new FormControl(undefined, Validators.required),
      description: new FormControl(undefined),
      price: new FormControl(undefined)
    });
    this.form.valueChanges
      .pipe(takeUntil(this.$unsubscribe))
      .subscribe(() => this.formEmitter.emit({ type: DialogType.product, valid: this.form.valid, values: this.form.value }));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']?.currentValue) {
      this.form.patchValue(changes['data']?.currentValue?.item);
      this.formEmitter.emit({ type: DialogType.product, valid: this.form.valid, values: this.form.value });
    }
  }

  public ngOnDestroy(): void {
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }
}
