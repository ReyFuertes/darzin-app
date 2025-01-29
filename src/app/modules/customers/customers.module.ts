import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerPurchaseService, CustomersService } from './customer.service';
import { ProductsService } from '../products/products.service';

const routes: Routes = [
  { path: '', component: CustomerListComponent },
];

@NgModule({
  declarations: [
    CustomerListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule.forChild(routes),
  ],
  exports: [],
  providers: [CustomersService, CustomerPurchaseService, ProductsService],
})
export class CustomersModule { }