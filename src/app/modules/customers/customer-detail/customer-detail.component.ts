import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { DialogType, IFormInfo } from '../../../models/app.model';
import { ICustomer } from '../customer.model';
import { GenericDestroy } from '../../../shared/generics/destroy.generic';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent extends GenericDestroy implements OnChanges {
  @Input() public data: ICustomer;
  @Output() public formEmitter = new EventEmitter<IFormInfo>();

  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      id: new FormControl(undefined),
      name: new FormControl(undefined, Validators.required)
    });
    this.form.valueChanges
      .pipe(takeUntil(this.$unsubscribe))
      .subscribe(() => this.formEmitter.emit({ type: DialogType.customer, valid: this.form.valid, values: this.form.value }));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']?.currentValue) {
      this.form.patchValue(changes['data']?.currentValue?.item);
      this.formEmitter.emit({ type: DialogType.customer, valid: this.form.valid, values: this.form.value });
    }
  }
}
