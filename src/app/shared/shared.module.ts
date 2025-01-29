import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

import { TableComponent } from './components/table/table.component';
import { PageListComponent } from './components/page-list/page-list.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { ProductDetailComponent } from '../modules/products/product-detail/product-detail.component';
import { TopnavComponent } from './components/top-nav/top-nav.component';
import { RouterModule } from '@angular/router';
import { CustomerDetailComponent } from '../modules/customers/customer-detail/customer-detail.component';
import { CustomerPurchasesComponent } from '../modules/customers/customer-purchases/customer-purchases.component';
import { CustomerPurchaseComponent } from '../modules/customers/customer-purchase/customer-purchase.component';

@NgModule({
  declarations: [
    TableComponent,
    PageListComponent,
    DialogComponent,
    ProductDetailComponent,
    CustomerDetailComponent,
    TopnavComponent,
    CustomerPurchasesComponent,
    CustomerPurchaseComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatSortModule,
    MatDialogModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatSelectModule,
    MatOptionModule,
  ],
  exports: [
    TableComponent,
    PageListComponent,
    TopnavComponent
  ],
  providers: [],
})
export class SharedModule { }